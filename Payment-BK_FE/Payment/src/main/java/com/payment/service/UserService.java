package com.payment.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.bson.Document;
import org.bson.types.ObjectId;

import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Filters;
import com.mongodb.client.result.UpdateResult;
import com.payment.entity.Transaction;
import com.payment.entity.User;

public class UserService {
	//Our MongoDB is running in port 27017 in localhost. 
	//Suppose mongodb in our local machine is running in different port, we need to configure here
	MongoClient client = new MongoClient("localhost", 27017); //connect to mongodb
	MongoCollection<Document> collection = client.getDatabase("payment").getCollection("User");
	
	//Save the user in User collection
	public String registerUser(User user){
		collection.insertOne(userToDocument(user));
		return "user registered successfully";
	}
	
	
	//Login the user by passing username & password in User collection
	public User loginUser(User user) throws Exception{
		Document document = collection
				.find(Filters.and(Filters.eq("username", user.getUsername()), Filters.eq("password",  user.getPassword())))
				.first();
		return documentToUser(document);
	}
	
	//Edit the user by passing user details & userID in User collection
	public String editUser(User user, String id) throws Exception{
		ObjectId idd = new ObjectId(id);
		
		
		Document document = userToDocument(user);
        UpdateResult updateResult = collection.updateOne(
        		Filters.eq("_id", idd), new Document("$set", document));
		
        if (updateResult.getMatchedCount() == 0) {
            System.out.println("User with ID not updated in the database = " + id);
            return null;
        }
        PaymentService pay = new PaymentService();
        pay.updateTransaction(id, user.getName());
		return "User updated successfully";				
	}
	
	//Get particular user by passing userName & email in User collection
	public User getUser(String userName, String email) throws Exception{
		Document document = collection
				.find(Filters.and(Filters.eq("name", userName), Filters.eq("username",  email)))
				.first();
		if(document==null) {
			throw new Exception("User not found");
		}
		User userFromDb = documentToUser(document);
		if(userFromDb == null) {
			throw new Exception("User not found");
		}
		return userFromDb;
	}
	
	public User getUser(String userId) throws Exception{
		Document document = collection
				.find(Filters.eq("_id", userId))
				.first();
		User userFromDb = documentToUser(document);
		if(userFromDb == null) {
			throw new Exception("User not found");
		}
		return userFromDb;
	}
	
	
	//Get particular user by passing accNo & fromName in User collection
	public User getUserByAccNo(String accNo, String fromName) throws Exception{
		Document document = collection
				.find(Filters.and(Filters.eq("accNo", accNo)))
				.first();
		User userFromDb = documentToUser(document);
		if(userFromDb == null) {
			throw new Exception("Account not found");
		}
		if(fromName.equals(userFromDb.getName())) {
			throw new Exception("from & to user cannot be same");
		}
		return userFromDb;
		
	}
	
	//Get all users in User collection
	public List<User> getAllUsers(){
		List<User> list = collection.find().into(new ArrayList<>()).stream()
				.map(this::documentToUser).collect(Collectors.toList());
		if(list != null){
			return list;
		}
		return null;
	}
	
	public Document userToDocument(User user) {
        Document document = new Document();
        document.append("name", user.getName());
        document.append("username", user.getUsername());
        document.append("password", user.getPassword());
        document.append("cnumber", user.getCnumber());
        document.append("accNo", user.getAccNo());
        return document;
    }
	
	public User documentToUser(Document document) {
		User User = new User();
        User.setId(document.getObjectId("_id").toString());
        User.setName(document.getString("name"));
        User.setUsername(document.getString("username"));
        User.setPassword(document.getString("password"));
        User.setCnumber(document.getString("cnumber"));
        User.setAccNo(document.getString("accNo"));
        return User;
	}
}
