# API

## Client to server

### newUser(status, movement, latitude,longitude,[services])
status is an int from 0 to 10 which represents the danger

movement is an int 0 if the person can move 1 if he can't

services is a vector that can be empty wich represents what action can this person offer ("aid", "transport")

```
{
  "status" : 0,
  "userID" : 1234567890
}
```

### updateUserState(userID, latitude, longitude)
userID is an int representing the user
```
{
  "status" : 0
}
```

### jobDone(decision)

decision is an int, 0 representing that the person was unable to complete the job 1 if he has completed it
```
{
 "status" : 0
}

### notAvailable(userID)
userID is an int representing the user
{
 "status" : 0
}

## Server to client

### sendPerson(latitude, longitude)

latitude and longitude is where the person has to go
```
{
  "status" : 0
}
```

### sendTransport(latitude, longitude, latitudeFi, longitudeFi)

latitude and longitude is where the person has to pick up a person

latitudeFi and longitudeFi is the final destination

```
{
  "status" : 0
}
```

### askDangerRate(danger)

danger is an int form 0 to 10 which represents the danger

```
{
  "status" : 0
}
```

