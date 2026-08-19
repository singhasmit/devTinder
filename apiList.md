##Devtinder APIS

auth router
-POST/ signup
-POST/ login
-POST/ signout


##profile router
-GET/ profile/view
-PATCH/ profile/edit
-PATCH/ profile/password


##connectionRequestRouter
-POST /request/send/interested/:userId
-POST /request/send/ignored/:userId
-POST /request/review/accepted/:requestId
-POST /request/review/rejected/:requestId


##userRouter
-GET /user/connections
-GET /user/requests
-GET /feed  -> gets you profile of other users


Status : ignore , interested, accepted , rejected
