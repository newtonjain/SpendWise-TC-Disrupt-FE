angular.module('app.services')

.service('httpBackend', function($http){
    var endpoint = 'http://sbe.soundsearch.io';

    this.loginUserId = null;

    this.getLoginUserId = () => this.loginUserId;

    this.getUser = function (success, error) {
        $http.get(endpoint + '/users/' + this.getLoginUserId())
        .then(
            response => {
                success(response.data)
            },
            response => {
                error(response);
            }
        );
    };

    this.getAllItems = function (success, error) {
        $http(
            {
               method: 'Get',
               url: endpoint + '/getAllItems'
            }).then(function success(response) {
               console.log ("here is the items", response)
                return response;
        
            }, function error(response) {
               // called asynchronously if an error occurs
               // or server returns response with an error status.
               console.log ("Error occured while trying to fetch data", response)
               return response;
        });
    };




    this.facebookLogin = function (authData, userType, location, success, error) {
        userTypeToBackend = {
            'customer': 'Customer',
            'chef': 'Chef'
        };

        $http.post(endpoint + '/users/add', {
            userType: userTypeToBackend[userType],
            email: authData.email,
            name: authData.displayName,
            contactNumber: '',
            profilePictureUrl: authData.profileImageURL,
            facebookToken: authData.id
        })
        .then(
            response => {
                this.loginUserId = response.userId;
                success(response.data);
            },
            response => error(response)
        );
    };

    this.getAllItems = function (success, error) {
    var files = {"items":[{"itemId":"db41e4b4-a187-44be-ba9b-893f40025509","fileName":"NEXT AI interview.wav","fileUploadDateMillis":1560745364000,"transcriptionText":"testing testing triangulating this is for next year interview awesome hello everyone I'm a graduate of University of Toronto did engineering science there then right after graduation found in my first startup it was called connectivity a ran that for a year and then eventually went and worked for Microsoft has a program manager and two years ago left Microsoft and found it meets cry which is an AI meeting assistant that transcribes and summarizes meeting notes because audio and is built to boost organizational productivity while I was at Microsoft I realize particularly be there are a lot of program managers that were sitting in meetings and taking notes and they could be better use of our time and we realize that was pretty widespread problem across different Industries so in automated transcription service that could take note summarize it for you do the analytics and kind of get the post-meeting logistics automatically done for you could be of value to a lot of companies so I ended up building that for a hackathon actually we ended up winning the globally a hackathon but that project was by Microsoft itself represented in Paris so I was in Paris for three weeks that's where we acquired a few customers and realize that this can test this can be commercialized the actually incorporate Incorporated the business came back to Toronto became part of CDL so we were a CDL alumni in the a ice cream in 2017 and love winning spark ignite that's how I met Veronica you're part of the same cohort and then last year just been building the product and improving the feature size so that's being the journey so far it's been quite eventful and right now we're going in improving our accuracy where for transcription adding new feature set and pretty much making sure that we can engage more yeah you question absolutely meeting people many voices many dialects many many many how does your how does it deal with all of that and differentiating and everything else that happens in the meeting so we do support multiple languages when meetings you can choose the language of your choice we do have different parameters you can tweak whether it's near field far field we actually can tweak the acoustic models it's too noisy or if it's a quiet room like this this is the idea of meeting scenario by the way and also we do speaker recognition so if not everyone has the devices on and there's only one device at the end of the meeting we can distinguish who said what and that's that's one way we get like really good streamline meeting notes and one of so we are right now we are leveraging Google speaker ization API because I mean they were providing the best accuracy and eventually we are also experimenting with our own models using Bachchan mixture models to make sure that we can add that provide does everyone have the have to have the app open or like like as if one speaker like just sort of explained that this was a meeting who all of us have a have our app open so meet scribe is a platform agnostic web applications it works on all different devices including phones laptops and tablets if individuals want they can all connect to the same meeting using their own devices turn on the trunk turn on the microphone and we can transcribe based for multiple devices but many times we have seen in a pasture customers don't do that so you could have just one device transcribing all of the meeting notes and at the end you do the speaker recognition that separates all of the different dialects different points for user really interesting anyone else have questions about the amount on the I just how many people are there in the human specifically guy stuff so right now it gives small team we have a team of three and six myself the co-founder is Jason he was my friend from University and he works at Amazon and we have fewer other developers who are on contract and we have a business development manager can you talk a little bit about how many people are there so right now it gives small team here a team of three and six myself the co-founder is Jason he was my friend from University and he works at Amazon and we have fewer other developers who are on contract and we have a business development manager can you talk a little bit about the competition yes so right now we have seen emergence of other transcription applications specifically were the last 12 to 16 months West especially when the voice are Technologies are improving really and the transcription Services I'm proving quite well so Otto reai is one big competition that's be California there is 12 million dollars in funding we have reason 8 there is one point two million dollars in 2015 there is Hendricks AI they're based out of Calgary their part of one of the regional incubators there and in addition to that I believe Microsoft is also internally working on a service like this to help the transcription with those are the main kind of competitors that do it automatically there are some manual transcription Services where they send individuals to meetings and they take a meal but they are very expensive and the turnaround time is not instant so you have to wait for a few days and the cost for that can go up to five to seven hundred dollars per meeting do you have a secret sauce or some something that differentiates you from your competition so I think one thing we did with our application and you're all free to try it out it's absolutely clear is the way we build the entire build our application of very user-centric we just didn't focus on transcription that's what a lot of our competitors do they just just wondering this everyone ready to come in full time that's what everyone everyone that's right thank you thank you","transcriptionEntities":{"datetags":["next year","a year","two years ago","AI","three weeks","2017","last 12 to 16 months West especially","2015","a few days","next Friday","tomorrow","next day"],"keywordtags":["Point key points of the meeting","meeting using their own devices","Microsoft and found it meets cry which is an AI meeting","transcription applications","point for us in on once the transcription","customers all me customers you have but have you heard about that from customer","customers only customers you have but have you heard about that from Custom","meeting","devices but many times","applications it works on all different devices","productivity while I was at Microsoft","customers and realize that this can test this can be commercialized the actually incorporate Incorporated the business","transcription","devices","time","productivity","applications","business","points","customers"],"locationtags":["Paris","Toronto","California","Calgary","Direction","Cloud"],"organizationtags":["University of Toronto","Microsoft","CDL","Google","University","Amazon","Consulting Financial","Technologies","Target"],"persontags":["Veronica","Bachchan","Jason","Otto","Hendricks AI","Concepts","Alexa Watson Google","Joan"]},"sentiment":"positive","contentLink":"TODO"},
    {"itemId":"db41e4b4-a187-44be-ba9b-893f40025509","fileName":"NEXT AI interview.wav","fileUploadDateMillis":1560745364000,"transcriptionText":"testing testing triangulating this is for next year interview awesome hello everyone I'm a graduate of University of Toronto did engineering science there then right after graduation found in my first startup it was called connectivity a ran that for a year and then eventually went and worked for Microsoft has a program manager and two years ago left Microsoft and found it meets cry which is an AI meeting assistant that transcribes and summarizes meeting notes because audio and is built to boost organizational productivity while I was at Microsoft I realize particularly be there are a lot of program managers that were sitting in meetings and taking notes and they could be better use of our time and we realize that was pretty widespread problem across different Industries so in automated transcription service that could take note summarize it for you do the analytics and kind of get the post-meeting logistics automatically done for you could be of value to a lot of companies so I ended up building that for a hackathon actually we ended up winning the globally a hackathon but that project was by Microsoft itself represented in Paris so I was in Paris for three weeks that's where we acquired a few customers and realize that this can test this can be commercialized the actually incorporate Incorporated the business came back to Toronto became part of CDL so we were a CDL alumni in the a ice cream in 2017 and love winning spark ignite that's how I met Veronica you're part of the same cohort and then last year just been building the product and improving the feature size so that's being the journey so far it's been quite eventful and right now we're going in improving our accuracy where for transcription adding new feature set and pretty much making sure that we can engage more yeah you question absolutely meeting people many voices many dialects many many many how does your how does it deal with all of that and differentiating and everything else that happens in the meeting so we do support multiple languages when meetings you can choose the language of your choice we do have different parameters you can tweak whether it's near field far field we actually can tweak the acoustic models it's too noisy or if it's a quiet room like this this is the idea of meeting scenario by the way and also we do speaker recognition so if not everyone has the devices on and there's only one device at the end of the meeting we can distinguish who said what and that's that's one way we get like really good streamline meeting notes and one of so we are right now we are leveraging Google speaker ization API because I mean they were providing the best accuracy and eventually we are also experimenting with our own models using Bachchan mixture models to make sure that we can add that provide does everyone have the have to have the app open or like like as if one speaker like just sort of explained that this was a meeting who all of us have a have our app open so meet scribe is a platform agnostic web applications it works on all different devices including phones laptops and tablets if individuals want they can all connect to the same meeting using their own devices turn on the trunk turn on the microphone and we can transcribe based for multiple devices but many times we have seen in a pasture customers don't do that so you could have just one device transcribing all of the meeting notes and at the end you do the speaker recognition that separates all of the different dialects different points for user really interesting anyone else have questions about the amount on the I just how many people are there in the human specifically guy stuff so right now it gives small team we have a team of three and six myself the co-founder is Jason he was my friend from University and he works at Amazon and we have fewer other developers who are on contract and we have a business development manager can you talk a little bit about how many people are there so right now it gives small team here a team of three and six myself the co-founder is Jason he was my friend from University and he works at Amazon and we have fewer other developers who are on contract and we have a business development manager can you talk a little bit about the competition yes so right now we have seen emergence of other transcription applications specifically were the last 12 to 16 months West especially when the voice are Technologies are improving really and the transcription Services I'm proving quite well so Otto reai is one big competition that's be California there is 12 million dollars in funding we have reason 8 there is one point two million dollars in 2015 there is Hendricks AI they're based out of Calgary their part of one of the regional incubators there and in addition to that I believe Microsoft is also internally working on a service like this to help the transcription with those are the main kind of competitors that do it automatically there are some manual transcription Services where they send individuals to meetings and they take a meal but they are very expensive and the turnaround time is not instant so you have to wait for a few days and the cost for that can go up to five to seven hundred dollars per meeting do you have a secret sauce or some something that differentiates you from your competition so I think one thing we did with our application and you're all free to try it out it's absolutely clear is the way we build the entire build our application of very user-centric we just didn't focus on transcription that's what a lot of our competitors do they just just wondering this everyone ready to come in full time that's what everyone everyone that's right thank you thank you","transcriptionEntities":{"datetags":["next year","a year","two years ago","AI","three weeks","2017","last 12 to 16 months West especially","2015","a few days","next Friday","tomorrow","next day"],"keywordtags":["Point key points of the meeting","meeting using their own devices","Microsoft and found it meets cry which is an AI meeting","transcription applications","point for us in on once the transcription","customers all me customers you have but have you heard about that from customer","customers only customers you have but have you heard about that from Custom","meeting","devices but many times","applications it works on all different devices","productivity while I was at Microsoft","customers and realize that this can test this can be commercialized the actually incorporate Incorporated the business","transcription","devices","time","productivity","applications","business","points","customers"],"locationtags":["Paris","Toronto","California","Calgary","Direction","Cloud"],"organizationtags":["University of Toronto","Microsoft","CDL","Google","University","Amazon","Consulting Financial","Technologies","Target"],"persontags":["Veronica","Bachchan","Jason","Otto","Hendricks AI","Concepts","Alexa Watson Google","Joan"]},"sentiment":"positive","contentLink":"TODO"}]}

    return {
        all: function() {
          return files;
        },
        remove: function(file) {
          files.splice(files.indexOf(file), 1);
        },
        get: function(fileId) {
          for (var i = 0; i < files.length; i++) {
            if (files[i].id === parseInt(fileId)) {
              return files[i];
            }
          }
          return null;
        }
      };
    }
});
