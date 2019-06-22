db.dropUser("hiddout", {w: "majority", wtimeout: 5000})
db.posts.drop()
db.boards.drop()
db.users.drop()
db.comments.drop()
db.subscriptions.drop()
db.reactions.drop()
db = db.getSiblingDB('adminList');
db.founders.drop()