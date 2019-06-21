db.createUser({
	user: 'hiddout',
	pwd: 'admin',
	roles: [{ role: 'read', db: 'adminList' },{role: 'readWrite', db: 'test'}],
});
db.boards.insert({name: 'life'});
db.boards.insert({name: 'work'});
db.boards.insert({name: 'game'});
db.boards.insert({name: 'spam'});

db = db.getSiblingDB('adminList');
db.founders.insert({name: 'admin'});