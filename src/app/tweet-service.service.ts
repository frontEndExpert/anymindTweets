import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse  } from '@angular/common/http';

import { Observable, Observer, Subscription, interval } from 'rxjs';
import { map } from 'rxjs/operators';

export interface TweetObj {
  "account": {"fullname": string,
            "href": string,
            "id": number },
  "date": string,
  "hashtags": string[],
  "likes": number, 
  "replies": number, 
  "retweets": number, 
  "text": string
}

@Injectable({
  providedIn: 'root'
})
export class TweetServiceService {
  allTweets2;
  allTweets = [
      {
        "account": {
          "fullname": "Zaur M", 
          "href": "/imzaur777", 
          "id": 813452071458447361
        }, 
        "date": "12:10 AM - 30 Aug 2018", 
        "hashtags": [
          "#python", 
          "#programming"
        ], 
        "likes": 1, 
        "replies": 3, 
        "retweets": 0, 
        "text": "Anyone know good resources to train #python #programming skills? Send me ones please."
      }, 
      {
        "account": {
          "fullname": "Uber Engineering", 
          "href": "/UberEng", 
          "id": 2573880420
        }, 
        "date": "10:24 PM - 30 Aug 2018", 
        "hashtags": [
          "#Python", 
          "#Golang"
        ], 
        "likes": 14, 
        "replies": 1, 
        "retweets": 4, 
        "text": "Migrating our Schemaless sharding layer from #Python to #Golang while in production demonstrated that it was possible for us to rewrite the frontend of a massive datastore with zero downtime. \n http://ubr.to/2oqdQOu\u00a0pic.twitter.com/e44pwPDnrf"
      }, 
      {
        "account": {
          "fullname": "IBM Developer", 
          "href": "/IBMDeveloper", 
          "id": 16362921
        }, 
        "date": "11:15 PM - 30 Aug 2018", 
        "hashtags": [
          "#Python"
        ], 
        "likes": 5, 
        "replies": 0, 
        "retweets": 2, 
        "text": "Let us show you how to speed #Python up in your environments to optimize its use.  http://spr.ly/6011DxSUf\u00a0"
      }, 
      {
        "account": {
          "fullname": "Tom Lynch", 
          "href": "/tompiler", 
          "id": 307070295
        }, 
        "date": "9:59 AM - 21 Aug 2018", 
        "hashtags": [
          "#Python"
        ], 
        "likes": 12, 
        "replies": 2, 
        "retweets": 6, 
        "text": "#Python being synchronously clever and stupid pic.twitter.com/TE04lRuzXx"
      }, 
      {
        "account": {
          "fullname": "Daniil Churikov", 
          "href": "/danechkin", 
          "id": 50286158
        }, 
        "date": "12:36 AM - 30 Aug 2018", 
        "hashtags": [
          "#python"
        ], 
        "likes": 3, 
        "replies": 5, 
        "retweets": 2, 
        "text": "What's tool should I use to manage different #python installations? Search gives me several options: pip+virtualenv, virtualenvwrapper, virtualenv burrito, conda, autoenv, direnv..."
      }, 
      {
        "account": {
          "fullname": "T\u00e2nia Andrea", 
          "href": "/taniaandrea_com", 
          "id": 217380773
        }, 
        "date": "11:06 PM - 30 Aug 2018", 
        "hashtags": [
          "#python", 
          "#OSSummit"
        ], 
        "likes": 2, 
        "replies": 0, 
        "retweets": 3, 
        "text": "I had an interview today about my contributions to some open source communities. I talked especially about the foundation of @PyLadiesDF and @PyBabies in Brazil <3 and an artist was drawing my caricature at once. I\u2019m looking forward to listening to the podcast! #python #OSSummitpic.twitter.com/P5e0AUOGvT"
      }, 
      {
        "account": {
          "fullname": "\u20b5\u024e\u0e3f\u0246\u2c64 \u20b1\u0244\u20a6\u20ad", 
          "href": "/D3f2lt", 
          "id": 880150204011479041
        }, 
        "date": "7:05 AM - 30 Aug 2018", 
        "hashtags": [
          "#tweeters", 
          "#followers", 
          "#python", 
          "#developer"
        ], 
        "likes": 22, 
        "replies": 8, 
        "retweets": 39, 
        "text": "Hello, #tweeters and #followers!\nI'm looking for a job, especially as #python #developer role!\nDM is open!\nretweeting is appreciated!"
      }, 
      {
        "account": {
          "fullname": "DAVID!", 
          "href": "/othreecodes", 
          "id": 89954856
        }, 
        "date": "3:45 AM - 30 Aug 2018", 
        "hashtags": [
          "#KnowITBootcamp", 
          "#scratch", 
          "#python", 
          "#HTML", 
          "#CSS", 
          "#Javascript"
        ], 
        "likes": 27, 
        "replies": 4, 
        "retweets": 17, 
        "text": "This is Murewa\nThis is his second #KnowITBootcamp\nMurewa learnt #scratch and #python last year\nThis year he's learning #HTML #CSS and #Javascript\nMurewa is on he's way to being a full stack developer \nBe like Murewapic.twitter.com/WnpLOT96wC"
      }, 
      {
        "account": {
          "fullname": "Packt", 
          "href": "/PacktPub", 
          "id": 17778401
        }, 
        "date": "6:00 PM - 30 Aug 2018", 
        "hashtags": [
          "#Python", 
          "#FreeLearning"
        ], 
        "likes": 10, 
        "replies": 0, 
        "retweets": 2, 
        "text": "Scientific Computing with #Python 3 is today's free eBook. Don't miss your chance to download a copy  http://bit.ly/PacktDailyOffer\u00a0 #FreeLearningpic.twitter.com/KP9apQymQ1"
      }, 
      {
        "account": {
          "fullname": "James Balamuta", 
          "href": "/axiomsofxyz", 
          "id": 598614598
        }, 
        "date": "12:29 PM - 24 Aug 2018", 
        "hashtags": [
          "#python", 
          "#rstats", 
          "#python"
        ], 
        "likes": 36, 
        "replies": 3, 
        "retweets": 13, 
        "text": "Wow, I didn't realize the @rstudio daily build had line-by-line execution for #python. Another game changing feature and marrying of #rstats and #python environments.   https://rstudio.github.io/reticulate/articles/rstudio_ide.html#line-by-line-execution\u00a0\u2026pic.twitter.com/Hjq5lv7Asx"
      }, 
      {
        "account": {
          "fullname": "DrTempest van Schaik", 
          "href": "/Dr_Tempest", 
          "id": 2370233868
        }, 
        "date": "3:02 AM - 30 Aug 2018", 
        "hashtags": [
          "#learntocode", 
          "#python", 
          "#javascript"
        ], 
        "likes": 4, 
        "replies": 6, 
        "retweets": 3, 
        "text": "Looking for self-study #learntocode resources for a 13 year old who will be first in family to get a computer. I think it should be #python but open to suggestions (#javascript?). MUST be offline/mostly offline (so textbook>MOOC). Thanks! @FireTechCamp?"
      }, 
      {
        "account": {
          "fullname": "Connor J. Cantrell", 
          "href": "/connorjcantrell", 
          "id": 938413591295705089
        }, 
        "date": "11:40 PM - 30 Aug 2018", 
        "hashtags": [
          "#Python", 
          "#100DaysOfCode"
        ], 
        "likes": 0, 
        "replies": 0, 
        "retweets": 2, 
        "text": "20 @pybites challenges now completed. Today also marks the 30th day in a row of coding for me. 30 days ago, I had never worked with #Python. Big thanks to @pybites, @TalkPython for enabling me to access amazing resources #100DaysOfCode"
      }, 
      {
        "account": {
          "fullname": "Alec Down", 
          "href": "/acdown87", 
          "id": 704377405012447232
        }, 
        "date": "7:40 PM - 30 Aug 2018", 
        "hashtags": [
          "#Python", 
          "#Nodejs", 
          "#graphs", 
          "#coding"
        ], 
        "likes": 2, 
        "replies": 1, 
        "retweets": 0, 
        "text": "I want to get started with dynamic graph generating, PRETTY graphs. Comfortable with #Python and #Nodejs ... Any recommendations on libraries? RT appreciated I i can get as many suggestions as possible! #graphs #coding"
      }, 
      {
        "account": {
          "fullname": "PySangamam", 
          "href": "/PySangamam", 
          "id": 978585507008413697
        }, 
        "date": "4:52 AM - 28 Aug 2018", 
        "hashtags": [
          "#Python", 
          "#PySangamam"
        ], 
        "likes": 24, 
        "replies": 8, 
        "retweets": 14, 
        "text": " PySangamam has a flashy new logo \n\nThe idea was to bring 2 things that were quintessentially Tamil Nadu. \n\nIf you're able to identify both of them, do @ us. We're really excited to see what y'all come up with!\n\n\n#Python #PySangamampic.twitter.com/FRgOFJt04M"
      }, 
      {
        "account": {
          "fullname": "Hobbestigrou", 
          "href": "/hobbestigrou", 
          "id": 51089307
        }, 
        "date": "2:26 AM - 24 Aug 2018", 
        "hashtags": [
          "#jobs", 
          "#python", 
          "#django", 
          "#web"
        ], 
        "likes": 6, 
        "replies": 4, 
        "retweets": 14, 
        "text": "I 'm looking for a developer for a full time job, this person must know Python,  django and celery to work on media projects. No agency please #jobs #python #django #web."
      }, 
      {
        "account": {
          "fullname": "Mohammed albadrani", 
          "href": "/mjbadrani", 
          "id": 124903039
        }, 
        "date": "9:24 AM - 30 Aug 2018", 
        "hashtags": [
          "#AutoCAD", 
          "#3DStudioMax", 
          "#SketchUp", 
          "#Python", 
          "#JUNCTIONxKAUST"
        ], 
        "likes": 4, 
        "replies": 1, 
        "retweets": 3, 
        "text": "We need some one who has knowledge in the following:\n#AutoCAD\n#3DStudioMax\n#SketchUp\n#Python\nfor participate in  #JUNCTIONxKAUST\n  \n@hackJunction @JUNCTIONxKAUST"
      }, 
      {
        "account": {
          "fullname": "Graham Andrews", 
          "href": "/WVURockDoc", 
          "id": 804076796031434756
        }, 
        "date": "6:19 PM - 30 Aug 2018", 
        "hashtags": [
          "#python", 
          "#matplotlib"
        ], 
        "likes": 3, 
        "replies": 2, 
        "retweets": 0, 
        "text": "Plotting with #python and #matplotlib is a joy! No more Excel graphs  -ever.pic.twitter.com/oWIVqqJYEn"
      }, 
      {
        "account": {
          "fullname": "benshew", 
          "href": "/benshew", 
          "id": 18947072
        }, 
        "date": "10:58 PM - 30 Aug 2018", 
        "hashtags": [
          "#100daysofcode", 
          "#Python", 
          "#css"
        ], 
        "likes": 8, 
        "replies": 0, 
        "retweets": 1, 
        "text": "Day 3 of #100daysofcode. More #Python and working on #css animations. Bouncing all over the screen. @freeCodeCamp"
      }, 
      {
        "account": {
          "fullname": "Kirk Borne", 
          "href": "/KirkDBorne", 
          "id": 534563976
        }, 
        "date": "6:31 PM - 30 Aug 2018", 
        "hashtags": [
          "#DataScience", 
          "#MachineLearning", 
          "#DataScientists", 
          "#abdsc", 
          "#BigData", 
          "#AI", 
          "#DeepLearning", 
          "#NeuralNetworks", 
          "#Statistics", 
          "#PredictiveAnalytics", 
          "#Algorithms", 
          "#Python"
        ], 
        "likes": 72, 
        "replies": 0, 
        "retweets": 58, 
        "text": "Big Repository of #DataScience and #MachineLearning Resources for #DataScientists, including \u201c22 Articles and Tutorials on Classification Methods\u201d\n\nSee  http://bit.ly/2nvMXIx\u00a0\n#abdsc #BigData #AI #DeepLearning #NeuralNetworks #Statistics #PredictiveAnalytics #Algorithms #Python pic.twitter.com/qX4BbYa749"
      }, 
      {
        "account": {
          "fullname": "Safwen Hafsawy", 
          "href": "/SafwenHafsawy", 
          "id": 736538220872241152
        }, 
        "date": "2:33 AM - 30 Aug 2018", 
        "hashtags": [
          "#100DaysOfCode", 
          "#javascript", 
          "#Python", 
          "#pythonprogramming", 
          "#programming", 
          "#coding"
        ], 
        "likes": 12, 
        "replies": 1, 
        "retweets": 4, 
        "text": "What is #100DaysOfCode ? Is it some sort of challenge?\n#javascript #Python #pythonprogramming #programming #coding"
      }, 
      {
        "account": {
          "fullname": "T\u00e2nia Andrea", 
          "href": "/taniaandrea_com", 
          "id": 217380773
        }, 
        "date": "11:06 PM - 30 Aug 2018", 
        "hashtags": [
          "#python", 
          "#OSSummit"
        ], 
        "likes": 2, 
        "replies": 0, 
        "retweets": 3, 
        "text": "I had an interview today about my contributions to some open source communities. I talked especially about the foundation of @PyLadiesDF and @PyBabies in Brazil <3 and an artist was drawing my caricature at once. I\u2019m looking forward to listening to the podcast! #python #OSSummitpic.twitter.com/P5e0AUOGvT"
      }, 
      {
        "account": {
          "fullname": "Code Matrix", 
          "href": "/code__matrix", 
          "id": 725624559227957248
        }, 
        "date": "10:35 PM - 30 Aug 2018", 
        "hashtags": [
          "#python", 
          "#programming"
        ], 
        "likes": 3, 
        "replies": 0, 
        "retweets": 5, 
        "text": "The Complete Mastery to Python Basics - From Scratch\n\n\u261e  http://bit.ly/2NbSv6s\u00a0\n#python #programmingpic.twitter.com/e1PMUxxsZk"
      }, 
      {
        "account": {
          "fullname": "Uber Engineering", 
          "href": "/UberEng", 
          "id": 2573880420
        }, 
        "date": "10:24 PM - 30 Aug 2018", 
        "hashtags": [
          "#Python", 
          "#Golang"
        ], 
        "likes": 14, 
        "replies": 1, 
        "retweets": 4, 
        "text": "Migrating our Schemaless sharding layer from #Python to #Golang while in production demonstrated that it was possible for us to rewrite the frontend of a massive datastore with zero downtime. \n http://ubr.to/2oqdQOu\u00a0pic.twitter.com/e44pwPDnrf"
      }, 
      {
        "account": {
          "fullname": "Eduardo", 
          "href": "/laluxgp", 
          "id": 153039152
        }, 
        "date": "8:31 PM - 30 Aug 2018", 
        "hashtags": [
          "#javascript", 
          "#js", 
          "#react", 
          "#reactjs", 
          "#code", 
          "#webdeveloper", 
          "#webdevelopment", 
          "#angular", 
          "#redux", 
          "#vuejs", 
          "#app", 
          "#github", 
          "#git", 
          "#html", 
          "#css", 
          "#jquery", 
          "#node", 
          "#sql", 
          "#postgresql", 
          "#java", 
          "#python", 
          "#php", 
          "#node", 
          "#nodejs", 
          "#programming", 
          "#coding", 
          "#git", 
          "#softwareengineer", 
          "#webdev"
        ], 
        "likes": 20, 
        "replies": 1, 
        "retweets": 15, 
        "text": "Coder Sanders yall \n\u2022\n\u2022\n\u2022\n\u2022\n\u2022\n<>\n#javascript #js #react #reactjs #code #webdeveloper #webdevelopment #angular #redux #vuejs #app #github #git #html #css #jquery #node #sql #postgresql #java #python #php #node #nodejs #programming #coding #git #softwareengineer #webdev \n</>pic.twitter.com/xPRAjBJA7c"
      }, 
      {
        "account": {
          "fullname": "Jakub Keller", 
          "href": "/jakub_keller", 
          "id": 3365324512
        }, 
        "date": "6:59 PM - 30 Aug 2018", 
        "hashtags": [
          "#golang", 
          "#javascript", 
          "#Rust", 
          "#JuliaLang", 
          "#Kotlin", 
          "#Python"
        ], 
        "likes": 6, 
        "replies": 0, 
        "retweets": 3, 
        "text": "My top programming languages (in no order):\n\n- #golang \n- #javascript\n- #Rust \n- #JuliaLang\n- #Kotlin\n- #Python"
      }, 
      {
        "account": {
          "fullname": "Dr. GP Pulipaka", 
          "href": "/gp_pulipaka", 
          "id": 4263007693
        }, 
        "date": "6:32 PM - 30 Aug 2018", 
        "hashtags": [
          "#DataStax", 
          "#Azure", 
          "#BigData", 
          "#Analytics", 
          "#NoSQL", 
          "#Hadoop", 
          "#MongoDB", 
          "#ApacheCassandra", 
          "#Python", 
          "#RStats", 
          "#TensorFlow", 
          "#IoT", 
          "#IIoT", 
          "#Java", 
          "#JavaScript", 
          "#ReactJS", 
          "#VueJS", 
          "#GoLang", 
          "#CloudComputing", 
          "#Serverless", 
          "#DataScientist", 
          "#Linux"
        ], 
        "likes": 25, 
        "replies": 0, 
        "retweets": 29, 
        "text": "#DataStax + Microsoft #Azure Stack: The Making of Hybrid Cloud. #BigData #Analytics #NoSQL #Hadoop #MongoDB #ApacheCassandra #Python #RStats #TensorFlow #IoT #IIoT #Java #JavaScript #ReactJS #VueJS #GoLang #CloudComputing #Serverless #DataScientist #Linux\n http://bit.ly/2CbsYtk\u00a0pic.twitter.com/2vTnMGEs4J"
      }, 
      {
        "account": {
          "fullname": "Kirk Borne", 
          "href": "/KirkDBorne", 
          "id": 534563976
        }, 
        "date": "6:31 PM - 30 Aug 2018", 
        "hashtags": [
          "#DataScience", 
          "#MachineLearning", 
          "#DataScientists", 
          "#abdsc", 
          "#BigData", 
          "#AI", 
          "#DeepLearning", 
          "#NeuralNetworks", 
          "#Statistics", 
          "#PredictiveAnalytics", 
          "#Algorithms", 
          "#Python"
        ], 
        "likes": 72, 
        "replies": 0, 
        "retweets": 58, 
        "text": "Big Repository of #DataScience and #MachineLearning Resources for #DataScientists, including \u201c22 Articles and Tutorials on Classification Methods\u201d\n\nSee  http://bit.ly/2nvMXIx\u00a0\n#abdsc #BigData #AI #DeepLearning #NeuralNetworks #Statistics #PredictiveAnalytics #Algorithms #Python pic.twitter.com/qX4BbYa749"
      }, 
      {
        "account": {
          "fullname": "Dr. GP Pulipaka", 
          "href": "/gp_pulipaka", 
          "id": 4263007693
        }, 
        "date": "6:30 PM - 30 Aug 2018", 
        "hashtags": [
          "#DeepLearning", 
          "#BigData", 
          "#Analytics", 
          "#MachineLearning", 
          "#DataScience", 
          "#AI", 
          "#IoT", 
          "#IIoT", 
          "#Python", 
          "#RStats", 
          "#TensorFlow", 
          "#Java", 
          "#JavaScript", 
          "#ReactJS", 
          "#VueJS", 
          "#GoLang", 
          "#CloudComputing", 
          "#Serverless", 
          "#DataScientist", 
          "#ReLU", 
          "#Linux"
        ], 
        "likes": 14, 
        "replies": 0, 
        "retweets": 20, 
        "text": "#DeepLearning using Rectified Linear Units (ReLU). #BigData #Analytics #MachineLearning #DataScience #AI #IoT #IIoT #Python #RStats #TensorFlow #Java #JavaScript #ReactJS #VueJS #GoLang #CloudComputing #Serverless #DataScientist #ReLU #Linux\n http://bit.ly/2ww0d57\u00a0pic.twitter.com/iuQbcnh6uz"
      }, 
      {
        "account": {
          "fullname": "Python Programmers", 
          "href": "/python_devv", 
          "id": 3314148722
        }, 
        "date": "6:29 PM - 30 Aug 2018", 
        "hashtags": [
          "#django", 
          "#python"
        ], 
        "likes": 8, 
        "replies": 0, 
        "retweets": 3, 
        "text": "Python SciPy: The Open Source Python Library\n\n\u261e  https://ift.tt/2LFzY0Q\u00a0\n#django #python pic.twitter.com/8Kng2k3ccs"
      }, 
      {
        "account": {
          "fullname": "\u00a0\u2623 The Hacker Tools", 
          "href": "/KitPloit", 
          "id": 926702778
        }, 
        "date": "5:51 PM - 30 Aug 2018", 
        "hashtags": [
          "#DuckyExploit", 
          "#Framework", 
          "#Linux", 
          "#Mac", 
          "#Python", 
          "#RubberDucky", 
          "#Windows"
        ], 
        "likes": 34, 
        "replies": 0, 
        "retweets": 15, 
        "text": "Ducky-Exploit - Arduino Rubber Ducky Framework  http://j.mp/2NAd3pm\u00a0 #DuckyExploit #Framework #Linux #Mac #Python #RubberDucky #Windowspic.twitter.com/pnG9pniVIO"
      }, 
      {
        "account": {
          "fullname": "MapData Services", 
          "href": "/MapDataServices", 
          "id": 347539102
        }, 
        "date": "3:45 PM - 30 Aug 2018", 
        "hashtags": [
          "#FME", 
          "#Python", 
          "#FME", 
          "#Python", 
          "#MDS", 
          "#BigData"
        ], 
        "likes": 7, 
        "replies": 0, 
        "retweets": 9, 
        "text": "Spots are filling fast!\nIf you're interested in learning more about the world of @SafeSoftware #FME\u00a0with #Python, secure your spot at one of our training courses:  http://bit.ly/2oqGjnI\u00a0\u00a0#FME #Python #MDS #BigDatapic.twitter.com/7AALVHCY56"
      }, 
      {
        "account": {
          "fullname": "Matthew Lewis Smith", 
          "href": "/mattlewsmi", 
          "id": 786578841368002560
        }, 
        "date": "2:46 PM - 30 Aug 2018", 
        "hashtags": [
          "#DENCodingChallenge", 
          "#CodePuns", 
          "#Python", 
          "#Progress"
        ], 
        "likes": 3, 
        "replies": 0, 
        "retweets": 4, 
        "text": "Day 21 of the #DENCodingChallenge, well, it isn't the 31st... maybe we should have zero-indexed the days! #CodePuns, today I completed of the intro to SQL module bringing the total progress of my track to 50%! I can't believe it has been 21 days! #Python #Progress @DECDTNetworkpic.twitter.com/X17zrJZRID"
      }, 
      {
        "account": {
          "fullname": "Hexe Data", 
          "href": "/HexeData", 
          "id": 887239042873556993
        }, 
        "date": "1:18 PM - 30 Aug 2018", 
        "hashtags": [
          "#Python", 
          "#NLG", 
          "#PowerBI", 
          "#dataviz"
        ], 
        "likes": 9, 
        "replies": 0, 
        "retweets": 6, 
        "text": "New @MSPowerBI features are so good, that we cannot decide which one we like the most. Conditional formatting is a bomb, export to PDF is a life-saver, custom visuals looking sharp, #Python integration and #NLG summaries are just great. @MSPowerBI we love it! | #PowerBI #datavizpic.twitter.com/1Oq0QP0t4f"
      }, 
      {
        "account": {
          "fullname": "Python SV e.V.", 
          "href": "/PythonSV", 
          "id": 386982931
        }, 
        "date": "1:04 PM - 30 Aug 2018", 
        "hashtags": [
          "#programming", 
          "#read", 
          "#book", 
          "#Python", 
          "#DataScience", 
          "#ML", 
          "#AI", 
          "#Analytics", 
          "#algorithms"
        ], 
        "likes": 10, 
        "replies": 0, 
        "retweets": 4, 
        "text": "Have a #programming break and #read a #book  #Python #DataScience #ML #AI #Analytics #algorithms etc.pic.twitter.com/HxrbABz0tD"
      }, 
      {
        "account": {
          "fullname": "Rahul Singh", 
          "href": "/rahulrajatsingh", 
          "id": 59767753
        }, 
        "date": "11:04 AM - 30 Aug 2018", 
        "hashtags": [
          "#ASPNETCore", 
          "#java", 
          "#ruby", 
          "#python"
        ], 
        "likes": 10, 
        "replies": 1, 
        "retweets": 6, 
        "text": "The more I get deeper into #ASPNETCore, more I realize that perhaps this is THE best framework to write services. And this including all #java #ruby #python and other tech stack based frameworks.\n\nDon't believe me? Try it and see for yourself."
      }, 
      {
        "account": {
          "fullname": "MS Advanced Analytics BE", 
          "href": "/AdvAnalyticsBE", 
          "id": 939286894554308609
        }, 
        "date": "9:47 AM - 30 Aug 2018", 
        "hashtags": [
          "#IoT", 
          "#Python"
        ], 
        "likes": 5, 
        "replies": 0, 
        "retweets": 3, 
        "text": "And so the Prototyping #IoT with #Python workshop begins!\nAnd just as I'm typing this, another attendee walks in  pic.twitter.com/UkHwWbfFFD"
      }, 
      {
        "account": {
          "fullname": "Ronald van Loon", 
          "href": "/Ronald_vanLoon", 
          "id": 555031989
        }, 
        "date": "9:06 AM - 30 Aug 2018", 
        "hashtags": [
          "#MachineLearning", 
          "#ML", 
          "#Data", 
          "#Regression", 
          "#BusinessIntelligence", 
          "#Algorithms", 
          "#Regression", 
          "#Python", 
          "#RT"
        ], 
        "likes": 7, 
        "replies": 0, 
        "retweets": 18, 
        "text": "Naive Bayes Classification explained with Python code\n by @ataspinar2 @DataScienceCtrl |\n \n  http://bit.ly/2qplN8X\u00a0\n#MachineLearning #ML #Data #Regression #BusinessIntelligence #Algorithms #Regression #Python #RT pic.twitter.com/HBVMnzhMBjpic.twitter.com/dnnzMwzvp2"
      }, 
      {
        "account": {
          "fullname": "\u20b5\u024e\u0e3f\u0246\u2c64 \u20b1\u0244\u20a6\u20ad", 
          "href": "/D3f2lt", 
          "id": 880150204011479041
        }, 
        "date": "7:05 AM - 30 Aug 2018", 
        "hashtags": [
          "#tweeters", 
          "#followers", 
          "#python", 
          "#developer"
        ], 
        "likes": 22, 
        "replies": 8, 
        "retweets": 39, 
        "text": "Hello, #tweeters and #followers!\nI'm looking for a job, especially as #python #developer role!\nDM is open!\nretweeting is appreciated!"
      }, 
      {
        "account": {
          "fullname": "PySangamam", 
          "href": "/PySangamam", 
          "id": 978585507008413697
        }, 
        "date": "4:13 AM - 30 Aug 2018", 
        "hashtags": [
          "#PySangamam", 
          "#Python"
        ], 
        "likes": 8, 
        "replies": 0, 
        "retweets": 7, 
        "text": "Excited to announce that Aruba Networks @ArubaNetworks has joined us as a Silver sponsor for PySangamam 2018. Thanks, Aruba Networks!\n\n#PySangamam #Python pic.twitter.com/hzhQjxkrUP"
      }, 
      {
        "account": {
          "fullname": "Juan Carlos Gilaranz Benito", 
          "href": "/_Juankar_", 
          "id": 22696323
        }, 
        "date": "11:49 PM - 30 Aug 2018", 
        "hashtags": [
          "#MundoSQL", 
          "#Excel", 
          "#Python", 
          "#microsoftexcel"
        ], 
        "likes": 0, 
        "replies": 0, 
        "retweets": 0, 
        "text": "#MundoSQL Recorrer una #Excel con el modulo xlrd de #Python #microsoftexcel http://rviv.ly/N24p97\u00a0"
      }, 
      {
        "account": {
          "fullname": "Django Fan", 
          "href": "/fan_django", 
          "id": 733589246502567937
        }, 
        "date": "11:45 PM - 30 Aug 2018", 
        "hashtags": [
          "#python"
        ], 
        "likes": 0, 
        "replies": 0, 
        "retweets": 0, 
        "text": "Practical Data Cleaning\n\n\u261e  https://ift.tt/2C3FlY9\u00a0\n#python pic.twitter.com/HJuv8mGOI3"
      }, 
      {
        "account": {
          "fullname": "visualpath.in", 
          "href": "/visual_path", 
          "id": 838998888140931072
        }, 
        "date": "11:45 PM - 30 Aug 2018", 
        "hashtags": [
          "#Visualpath", 
          "#Python", 
          "#Placement", 
          "#Oriented", 
          "#Training"
        ], 
        "likes": 0, 
        "replies": 0, 
        "retweets": 0, 
        "text": "#Visualpath Offering #Python #Placement #Oriented #Training with affordable cost. Interested people can attend Free Demo. For Details visit:  http://www.visualpath.in/Python-Training-in-Hyderabad\u00a0\u2026pic.twitter.com/yrsjUIAxRE"
      }, 
      {
        "account": {
          "fullname": "Python Planet", 
          "href": "/python_planet", 
          "id": 737930060968165377
        }, 
        "date": "11:42 PM - 30 Aug 2018", 
        "hashtags": [
          "#python", 
          "#DataScience"
        ], 
        "likes": 0, 
        "replies": 0, 
        "retweets": 0, 
        "text": "Data Science: Supervised Machine Learning in Python\n\n\u261e  http://bit.ly/2wlbXXf\u00a0\n#python #DataSciencepic.twitter.com/EG2sAuGfGX"
      }, 
      {
        "account": {
          "fullname": "Connor J. Cantrell", 
          "href": "/connorjcantrell", 
          "id": 938413591295705089
        }, 
        "date": "11:40 PM - 30 Aug 2018", 
        "hashtags": [
          "#Python", 
          "#100DaysOfCode"
        ], 
        "likes": 0, 
        "replies": 0, 
        "retweets": 2, 
        "text": "20 @pybites challenges now completed. Today also marks the 30th day in a row of coding for me. 30 days ago, I had never worked with #Python. Big thanks to @pybites, @TalkPython for enabling me to access amazing resources #100DaysOfCode"
      }, 
      {
        "account": {
          "fullname": "Lily's Social Media and Online Training", 
          "href": "/byLilyV", 
          "id": 134434122
        }, 
        "date": "11:38 PM - 30 Aug 2018", 
        "hashtags": [
          "#COURSES", 
          "#Python", 
          "#PostgreSQL", 
          "#online", 
          "#learning", 
          "#education", 
          "#edtech", 
          "#tech", 
          "#development", 
          "#udemy"
        ], 
        "likes": 1, 
        "replies": 0, 
        "retweets": 1, 
        "text": "FEATURED #COURSES\n#Python & #PostgreSQL Developer Course\n\nBuild 9 projects and master 2 essential and modern technologies in Python and PostgreSQL.\n\n https://goo.gl/NenWwB\u00a0\n#online #learning #education #edtech #tech #development #udemypic.twitter.com/R0VZMLHsLi"
      }, 
      {
        "account": {
          "fullname": "J West", 
          "href": "/according2jwest", 
          "id": 1012104068141993985
        }, 
        "date": "11:32 PM - 30 Aug 2018", 
        "hashtags": [
          "#Python"
        ], 
        "likes": 1, 
        "replies": 0, 
        "retweets": 0, 
        "text": "[Video] Minimum Cost Path Programming Interview Question With #Python Code  http://dlvr.it/Qhdz5n\u00a0pic.twitter.com/UhpSl4bffz"
      }, 
      {
        "account": {
          "fullname": "Mark Carpenter Jr", 
          "href": "/BeardySmeardy", 
          "id": 418307927
        }, 
        "date": "11:30 PM - 30 Aug 2018", 
        "hashtags": [
          "#Spectrum", 
          "#InternetSpeed", 
          "#automagic", 
          "#python", 
          "#corporateaccountability"
        ], 
        "likes": 1, 
        "replies": 0, 
        "retweets": 0, 
        "text": "#Spectrum My #InternetSpeed :\nPing: 39.14 ms\nDownload: 10.23 Mbit/s\nUpload: 11.24 Mbit/s\n#automagic #python #corporateaccountability"
      }, 
      {
        "account": {
          "fullname": "James van den Berg", 
          "href": "/JamesvandenBerg", 
          "id": 89009369
        }, 
        "date": "11:19 PM - 30 Aug 2018", 
        "hashtags": [
          "#VSC", 
          "#IoT", 
          "#Azure", 
          "#DevOps", 
          "#Code", 
          "#Go", 
          "#Ruby", 
          "#Java", 
          "#NodeJS", 
          "#Python", 
          "#PhP"
        ], 
        "likes": 2, 
        "replies": 0, 
        "retweets": 1, 
        "text": "Azure IoT Toolkit supports C#, Go, Java, Node.js, PHP, Python and Ruby to develop Azure IoT application in VS Code  https://blogs.msdn.microsoft.com/iotdev/2018/08/31/c-go-java-node-js-php-python-or-ruby-choose-your-favorite-language-to-develop-azure-iot-application-in-vs-code/\u00a0\u2026 #VSC #IoT #Azure #DevOps #Code #Go #Ruby #Java #NodeJS #Python #PhPpic.twitter.com/ujMm248bN0"
      }, 
      {
        "account": {
          "fullname": "Code Tutorials", 
          "href": "/code__tutorials", 
          "id": 725607975201591296
        }, 
        "date": "11:15 PM - 30 Aug 2018", 
        "hashtags": [
          "#Python", 
          "#programming"
        ], 
        "likes": 1, 
        "replies": 0, 
        "retweets": 0, 
        "text": "Bayesian Optimization in Python with Hyperopt\n\n\u261e  https://ift.tt/2zAagtX\u00a0\n#Python #programmingpic.twitter.com/dE6ZLzMFoh"
      }, 
      {
        "account": {
          "fullname": "IBM Developer", 
          "href": "/IBMDeveloper", 
          "id": 16362921
        }, 
        "date": "11:15 PM - 30 Aug 2018", 
        "hashtags": [
          "#Python"
        ], 
        "likes": 5, 
        "replies": 0, 
        "retweets": 2, 
        "text": "Let us show you how to speed #Python up in your environments to optimize its use.  http://spr.ly/6011DxSUf\u00a0"
      }, 
      {
        "account": {
          "fullname": "Python & Django", 
          "href": "/django_tutorial", 
          "id": 733580286844248064
        }, 
        "date": "11:14 PM - 30 Aug 2018", 
        "hashtags": [
          "#Python", 
          "#Developer"
        ], 
        "likes": 1, 
        "replies": 0, 
        "retweets": 1, 
        "text": "Ultimate Python Developer Course - Build Real Applications\n\n\u261e  http://bit.ly/2PfXO5t\u00a0\n#Python #Developerpic.twitter.com/smIPn3j8rG"
      }, 
      {
        "account": {
          "fullname": "COLLAB. Recruitment", 
          "href": "/Collab_Recruit", 
          "id": 851538824278704128
        }, 
        "date": "11:14 PM - 30 Aug 2018", 
        "hashtags": [
          "#Python", 
          "#Julia", 
          "#developers", 
          "#SoftwareDevelopment", 
          "#Programming", 
          "#MachineLearning"
        ], 
        "likes": 1, 
        "replies": 0, 
        "retweets": 3, 
        "text": "New #Python Rival? #Julia is winning over #developers by @Techworm_in #SoftwareDevelopment #Programming #MachineLearning  https://buff.ly/2NrjE5I\u00a0pic.twitter.com/ffp0SltHHW"
      }, 
      {
        "account": {
          "fullname": "\u311e`Y\u03b1g\u03c5\u044f\u03b1", 
          "href": "/PiinAlpin", 
          "id": 2239337156
        }, 
        "date": "11:09 PM - 30 Aug 2018", 
        "hashtags": [
          "#ruangguru", 
          "#python", 
          "#django"
        ], 
        "likes": 1, 
        "replies": 0, 
        "retweets": 0, 
        "text": "Maybe someone can help me, i want to sent an email with Django use JSON data. In the test case get return 1 but didn't send an email. Cc @ruangguru #ruangguru #python #djangopic.twitter.com/ZaqYPAwO4T"
      }
  ];




  
  constructor(private http: HttpClient) { }


  getAllTweets(): Observable<string> {

    const myObservableTweets = Observable.create((observer: Observer<string>) => {
     
      for(let i=0;i<this.allTweets.length;i++){
        setTimeout(() => {
          observer.next(JSON.stringify(this.allTweets[i]));
          //console.log('this.allTweets[' + i + "]" + JSON.stringify(this.allTweets[i]));
        }, 1000);
      }
  });
      return myObservableTweets ;
      //this.http.get('https://am-twitter-scrape.herokuapp.com/hashtags/Python?pages_limit=3&wait=0'    );
         // .subscribe((data) => this.allTweets2=data); 
      //console.log('this.allTweets2',this.allTweets2);
    //
    // let tweet = {date: }
    // const DATE_FORMAT = 'MMM d, y';
    // let theDate = {this.allTweets[0].date | date:'MMM d, y'}
    // let date = .format(DATE_FORMAT)

   // return [...this.allTweets];
  }
 

}
