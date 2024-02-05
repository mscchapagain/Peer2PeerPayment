package com.payment.service;

import java.util.List;

import org.bson.types.ObjectId;
import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.Morphia;
import org.mongodb.morphia.query.Query;
import org.mongodb.morphia.query.UpdateOperations;
import org.mongodb.morphia.query.UpdateResults;

import com.mongodb.MongoClient;
import com.payment.entity.User;

public class UserService {
	//Our MongoDB is running in port 27017 in localhost. 
	//Suppose mongodb in our local machine is running in different port, we need to configure here
	MongoClient client = new MongoClient("localhost", 27017); //connect to mongodb
	Datastore datastore = new Morphia().createDatastore(client, "payment"); //payment collection
	
	
	//Save the user in User collection
	public String registerUser(User user){
		datastore.save(user);
		return "user registered successfully";
	}
	
	
	//Login the user by passing username & password in User collection
	public User loginUser(User user) throws Exception{
		Query<User> filter = datastore.find(User.class).filter("username",user.getUsername()).filter("password", user.getPassword());
		User userFromDb = filter.get();
		return userFromDb;
	}
	
	//Edit the user by passing user details & userID in User collection
	public String editUser(User user, String id) throws Exception{
		ObjectId idd = new ObjectId(id);
		Query<User> query = datastore.createQuery(User.class).field("_id").equal(idd);
		UpdateOperations<User> updateOperations = datastore.createUpdateOperations(User.class)
							.set("accNo", user.getAccNo())
							.set("cnumber", user.getCnumber())
							.set("name", user.getName())
							.set("password", user.getPassword())
							.set("username", user.getUsername());
		UpdateResults results = datastore.update(query, updateOperations);
		System.out.println(results.getUpdatedExisting());
		return "User updated succeefully";				
	}
	
	//Get particular user by passing userName & email in User collection
	public User getUser(String userName, String email) throws Exception{
		
		Query<User> filter = datastore.find(User.class).filter("name",userName).filter("username", email);
		User userFromDb = filter.get();
		if(userFromDb == null) {
			throw new Exception("User not found");
		}
		return userFromDb;
	}
	
	
	//Get particular user by passing accNo & fromName in User collection
	public User getUserByAccNo(String accNo, String fromName) throws Exception{
		Query<User> filter = datastore.find(User.class).filter("accNo", accNo);
		User userFromDb = filter.get();
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
		List<User> list = datastore.find(User.class).asList();
		if(list != null){
			return list;
		}
		return null;
	}
}
