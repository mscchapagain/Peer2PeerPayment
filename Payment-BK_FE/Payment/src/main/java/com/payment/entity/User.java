package com.payment.entity;

//This Transaction entity for MongoDB collections, below attributes are columns basically
public class User {
	
	private String _id;
	private String name;
	private String username;
	private String password;
	private String cnumber;
	private String accNo;
	public String getId() {
		return _id;
	}
	public void setId(String _id) {
		this._id = _id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getCnumber() {
		return cnumber;
	}
	public void setCnumber(String cnumber) {
		this.cnumber = cnumber;
	}
	public String getAccNo() {
		return accNo;
	}
	public void setAccNo(String accNo) {
		this.accNo = accNo;
	}
	@Override
	public String toString() {
		return "User [_id=" + _id + ", name=" + name + ", username=" + username + ", password=" + password
				+ ", cnumber=" + cnumber + ", accNo=" + accNo + "]";
	}
	
}
