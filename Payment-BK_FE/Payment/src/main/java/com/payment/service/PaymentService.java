package com.payment.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.bson.Document;
import org.bson.conversions.Bson;

import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Aggregates;
import com.mongodb.client.model.Filters;
import com.payment.entity.Transaction;
import com.payment.entity.User;

public class PaymentService {
	
	//Our MongoDB is running in port 27017 in localhost. 
	//Suppose mongodb in our local machine is running in different port, we need to configure here
	MongoClient client = new MongoClient("localhost", 27017); //connect to mongodb
	MongoCollection<Document> collection = client.getDatabase("payment").getCollection("Transaction");
	//Save transaction in DB
	public String saveTransaction(Transaction transaction) throws Exception{
		Document document = transactionToDocument(transaction);
		collection.insertOne(document);
		return "Payment added successfully";
	}
	
	
	//get all transactions in DB by user & type like send or receive
	public List<Transaction> getAllPayments(User user, String type){
		List<Bson> list = new ArrayList<>();
		
		if(type.equals("SEND")) {
			list.add(Aggregates.match(Filters.eq("from", user.getName())));
		} else {
			list.add(Aggregates.match(Filters.eq("to", user.getName())));
		}
		
		List<Transaction> transactionList = collection.aggregate(list).into(new ArrayList<>()).stream()
				.map(this::documentToTransaction).collect(Collectors.toList());
		if(transactionList != null){
			return reverseList(transactionList);
		}
		return null;
	}
	
	public List<Transaction> getAllTransactions(String userId){
		List<Transaction> list = collection.find(Filters.eq("userId", userId)).into(new ArrayList<>()).stream()
				.map(this::documentToTransaction).collect(Collectors.toList());
		if(list != null){
			return list;
		}
		return null;
	}
	
	public void updateTransaction(String id, String name){
        collection.updateMany(Filters.eq("userId", id), new Document("$set", new Document("from", name)));
	}
	
	
	//This below block is to get the recent transaction in top of the list
	public static<T> List<T> reverseList(List<T> list)
    {
        List<T> reverse = new ArrayList<>(list);
        Collections.reverse(reverse);
        return reverse;
    }
	
	public Document transactionToDocument(Transaction transaction) {
        Document document = new Document();
        document.append("from", transaction.getFrom());
        document.append("to", transaction.getTo());
        document.append("notes", transaction.getNotes());
        document.append("accountNo", transaction.getAccountNo());
        document.append("date", transaction.getDate());
        document.append("amount", transaction.getAmount());
        document.append("type", transaction.getType());
        document.append("userId", transaction.getUserId());
        return document;
    }
	
	public Transaction documentToTransaction(Document document) {
		Transaction transaction = new Transaction();
        transaction.setId(document.getObjectId("_id").toString());
        transaction.setFrom(document.getString("from"));
        transaction.setTo(document.getString("to"));
        transaction.setNotes(document.getString("notes"));
        transaction.setAccountNo(document.getString("accountNo"));
        transaction.setDate(document.getDate("date"));
        transaction.setAmount(document.getDouble("amount"));
        transaction.setType(document.getString("type"));
        transaction.setUserId(document.getString("userId"));
        return transaction;
	}
}
