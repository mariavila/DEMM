# API

## Client to server

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

### notAvailable(userID)
userID is an int representing the user
{
}


## Server to client

### sendPerson(latitude, longitude)

latitude and longitude is where the person has to go
```
{
}
```

### sendTransport(latitude, longitude, latitudeFi, longitudeFi)

latitude and longitude is where the person has to pick up a person

latitudeFi and longitudeFi is the final destination

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

### status()

```
{
}
```

### sendID("userID")

userID is the identification of the user



