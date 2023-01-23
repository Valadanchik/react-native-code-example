# react-native-code-example



```
This feature works with firebase and pushwoosh analytics,
what does the function do?
connects with firebase and push-woosh, if the user is logged in sends events under this user, if not, sends data anonymously so that you can find out at what stage what is happening with the application from the graphs,
evName is the name of the event called in the callback functions of some functions,
evData is the data that needs to be sent to a specific event,
      for example, an unsuccessful login to the account, we get data from the phone, from which device an attempt was made to log into the account; if the attempt was not accepted by the account owner, then we will block access to the application by phone ID
these are not default events, but custom ones,
here it is divided into small parts so that there is no code repetition and it can be used separately
```
