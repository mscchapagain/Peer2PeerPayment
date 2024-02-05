package com.payment.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.Morphia;
import org.mongodb.morphia.query.Query;

import com.mongodb.MongoClient;
import com.payment.entity.Transaction;
import com.payment.entity.User;

public class PaymentService {
	
	//Our MongoDB is running in port 27017 in localhost. 
	//Suppose mongodb in our local machine is running in different port, we need to configure here
	MongoClient client = new MongoClient("localhost", 27017); //connect to mongodb
	
	//Below line is pointing our datastore to payment database in mongo
	Datastore datastore = new Morphia().createDatastore(client, "payment"); //payment collection
	
	
	//Save transaction in DB
	public String saveTransaction(Transaction transaction){
		datastore.save(transaction);
		return "Payment added successfully";
	}
	
	
	//get all transactions in DB by user & type like send or receive
	public List<Transaction> getAllPayments(User user, String type){
		Query<Transaction> query = null;
		if(type.equals("SEND")) {
			query = datastore.find(Transaction.class).filter("from", user.getName());
		} else {
			query = datastore.find(Transaction.class).filter("to", user.getName());
		}
		
		List<Transaction> list = query.asList();
		if(list != null){
			return reverseList(list);
		}
		return null;
	}
	
	
	//This below block is to get the recent transaction in top of the list
	public static<T> List<T> reverseList(List<T> list)
    {
        List<T> reverse = new ArrayList<>(list);
        Collections.reverse(reverse);
        return reverse;
    }
}
