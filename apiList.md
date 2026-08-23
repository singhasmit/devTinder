##Devtinder APIS

auth router
-POST/ signup
-POST/ login
-POST/ signout


##profile router
-GET/ profile/view
-PATCH/ profile/edit
-PATCH/ profile/password  //forgot password api


##connectionRequestRouter
-POST /request/send/:status/:userId

-POST /request/review/accepted/:requestId
-POST /request/review/rejected/:requestId


##userRouter
-GET /user/requests/received
-GET /user/connections
-GET /feed  -> gets you profile of other users


Status : ignore , interested, accepted , rejected
