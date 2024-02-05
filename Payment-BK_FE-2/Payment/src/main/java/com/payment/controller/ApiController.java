package com.payment.controller;

import static spark.Spark.before;
import static spark.Spark.exception;
import static spark.Spark.get;
import static spark.Spark.options;
import static spark.Spark.port;
import static spark.Spark.post;
import static spark.Spark.put;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import com.google.gson.Gson;
import com.payment.entity.Transaction;
import com.payment.entity.User;
import com.payment.service.PaymentService;
import com.payment.service.UserService;

public class ApiController {
	public static PaymentService paymentService = new PaymentService();
	public static UserService userService = new UserService();
	public static void main(String[] args){
		
		//here we configured the port number for backend application
		port(8081);
		Gson gson = new Gson();
		before((request, response) -> {
			response.header("Access-Control-Allow-Origin", "*");
			response.header("Access-Control-Allow-Methods", "*");
			response.header("Access-Control-Allow-Headers", "Origin, Content-Type");
		});
		options("*", (req, res) -> {
			res.status(200);
			return "";
		});
		
		
		//This savePayment api triggered during sendPayment screen, request body consists of Transaction attributes
        post("/savePayment", (req, res) -> {
        		res.type("application/json");
        		res.status(201);
        		Transaction transaction = gson.fromJson(req.body(), Transaction.class);
        		//Here we get user details by passing incoming account number and matched in mongoDb
        		User user = userService.getUserByAccNo(transaction.getAccountNo(), transaction.getFrom());
        		transaction.setTo(user.getName());
        		transaction.setDate(new Date());
        		//we return the transaction details after successfully saved in DB
        		return paymentService.saveTransaction(transaction);
        }, gson ::toJson);
        
        
        //This API is to get all transactions data based on TYPE -> SEND / RECIEVE,
        //Based on type, it will fetched in DB and return as JSON data
        get("/all-feeds", (req, res) -> {
    		res.type("application/json");
    		User user = userService.getUser(req.queryParams("username"), req.queryParams("email"));
    		return paymentService.getAllPayments(user, req.queryParams("type"));
        }, gson ::toJson);
        
        
        //This API to register the user
        post("/register", (req, res) -> {
    		res.type("application/json");
    		User user = gson.fromJson(req.body(), User.class);
    		return userService.registerUser(user);
	    }, gson ::toJson);
        
        
      //This API to edit the registered user details in mongodb
        put("/editUser", (req, res) -> {
    		res.type("application/json");
    		User user = gson.fromJson(req.body(), User.class);
    		return userService.editUser(user, req.queryParams("id"));
	    }, gson ::toJson);
        
        
      //This API to login user, it validates incoming email & password with mongoDB
        post("/login", (req, res) -> {
    		res.type("application/json");
    		res.status(200);
    		User user = gson.fromJson(req.body(), User.class);
    		return userService.loginUser(user);
	    }, gson ::toJson);
	    
        
      //This API to get all users data in mongoDB
	    get("/allUsers", (req, res) -> {
			res.type("application/json");
			return userService.getAllUsers();
	    }, gson ::toJson);
	    
	    
	  //This API to get particular user data based on email & name in mongoDB
	    get("/user", (req, res) -> {
			res.type("application/json");
			return userService.getUser(req.queryParams("username"), req.queryParams("email"));
	    }, gson ::toJson);
	    
	    
	    //Below block is to handle exception, if any exceptions occurred in above APIs -> spark will redirect to
	    //below exception block.
	    exception(Exception.class, (e, request, response) -> {
	    	response.type("application/json");
	        response.status(404);
	        Map<String, String> error = new HashMap<>();
	        error.put("error",e.getMessage());
	        response.body(gson.toJson(error));
	    });
	}
}
