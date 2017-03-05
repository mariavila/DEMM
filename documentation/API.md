# API

## Client to server

## IO

### newUser(danger, movement, latitude,longitude,[services])

danger is an int from 0 to 10 which represents the danger

movement is an int 0 if the person can move 1 if he can't

services is a vector with two ints, the first one indicates if the person can offer medical aid, the second one if the person can offer transport (1 if true)

```
{
}
```

### updateUserState(userID, latitude, longitude)
userID is an int representing the user
```
{
}
```

### jobDone(decision)

decision is an int, 0 representing that the person was unable to complete the job 1 if he has completed it
```
{
}
```

### notAvailable(userID)
userID is an int representing the user
```
{
}
```
### requestAllPos()
```
{
}
```

## Server to client

### sendPerson(latitude, longitude)

latitude and longitude is where the person has to go
```
{
}
```

### askDangerRate(danger)

danger is an int form 0 to 10 which represents the danger

```
{
}
```
### sendAllPos([{userID, latitude, longitude}, ])

```
{
}
```

### sendID("userID")

userID is the identification of the user

## Internal connection

#solver
state:
```
{
  "healers" :
    { "userID" :
        {
          "latitude": 45.02,
          "longitude" : 23.43        
        }
    },

    "injured" :
      {
        "userID" :
        {
          "motionless" : false,
          "latitude": 45.02,
          "longitude" : 23.43
        }      
      }
}
```

solve(state)
```
{
  "userID" :
      {
        "next":           
          {
            "latitude": 45.02,
            "longitude" : 23.43
          }            
        }
}
```
