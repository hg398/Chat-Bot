const expect=require('expect');

const {Users} = require('./users');

describe('Users', ()=>{

	var users;

	beforeEach(()=>{
		users=new Users();
		users.users=[{
			id: '1',
			name: 'Mike',
			room: 'node course'
		}, {
			id: '2',
			name: 'Jen',
			room: 'react course'
		}, {
			id: '3',
			name: 'Julie',
			room: 'node course'
		},
		]
	});

	it('should add new user',()=>{
		var users=new Users();
		var user={
			id: '123',
			name: 'harsh',
			room: 'a'
		};
		var resUser=users.addUser(user.id,user.name,user.room);
		expect(users.users).toEqual([user]);		
	});

	it('should return names for node course',()=>{
		var userList=users.getUserList('node course');
		expect(userList).toEqual(['Mike', 'Julie']);
	});

	it('should return names for react course',()=>{
		var userList=users.getUserList('react course');
		expect(userList).toEqual(['Jen']);
	});

});