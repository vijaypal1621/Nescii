<img src="https://user-images.githubusercontent.com/62353456/114301107-ddd4e180-9ae0-11eb-801e-74c7ea5cf136.jpg" />

# Nescii 

Deployed on firebase [nescii-1o1](https://nescii-1o1.web.app/).


Nescii is a platform where you can post your achievements, valuable information, any activity with your peers right here in home section. And in society section you will get all societies related stuff like meet-ups, upcoming events, their posts all at same location. So what are you waiting for, Start using it!!!!!

### Why Nescii?
There is already Linkedin to share our achivements, information, and any other activities
There are already societies pages on other social media sites like Facebook and Instagram
There is already whatsapp for sharing circulars, notices, etc.
Then Why Nescii?

### Answer is pretty simple 
- It is very often that we wouldn't be able to connect with every student of our college. So many times we would not be able to meet some like-minded peers to collaborate and work together. Won't be able to know the different domains in which our mates are working on. So to reduce that gap we have created Nescii.
Here every post is in public view means you just need to login in the website with the college ID. And you will be able to see every posts made by your peers. 
- It is very often that some students are not very active on social-media sites or there is significant possibility that we wouldn't get the upcoming events notice, important meet-ups, fun activities and some other society related stuff on right moment because we need to see every page individually. So to decrease this problems we have created Nescii. In this there is seperate page "societies" where all societies are listed. And you can navigate to any one of them to see the posts, upcoming events made by that particular society and Fun fact is in order to switch to different society, all you need to do is nothing. Just click another society tab and within nanoseconds you will be directed to that society and get the details.
- It will also be a tiring job for the societies admin to post in multiple social-media sites. So With Nescii they can post their stuff at the same location.
- It is also very common sharing circulars, notices,etc on whatsapp in multiple groups. At nescii they can post at a single place and students will infer from here.

## Functions

### `Actors`
There are three types of Actors.
1) Admin
3) College Students (Having valid college ID and login through that only. They have both read and write property)
4) Guests (They dont have valid college ID and thus they only have read property just to maintain decorum of posts.)

### `Authentication`
A student have to register first with a valid college ID. Then a verification mail is sent to his entered college ID. They needs to first verify it in order to eligible for making any post.
<img src="https://user-images.githubusercontent.com/62353456/114301040-846cb280-9ae0-11eb-8b1d-a4ed1b7e39fc.png" />

If a student is not having a valid college ID, they still can access to the posts by login through their google account. But they are considered as guests means they only have read-only feature.

### `Profile`
According to the state of actors, profile can be of 3 types:
<div> 
<img src="https://user-images.githubusercontent.com/62353456/114281385-b5ef6a80-9a5b-11eb-8986-d6b3a05ff5c2.jpg" width="250" height="300" />
<img src="https://user-images.githubusercontent.com/62353456/114281348-89d3e980-9a5b-11eb-948b-a7d5d63d8d4a.jpg" width="250" height="300" />
<img src="https://user-images.githubusercontent.com/62353456/114281326-5beea500-9a5b-11eb-8a62-d2746462a49d.jpg" width="250" height="300" />
 </div>

### `Home`
- Post Creator: 
  It allows to write text, attach multiple photos and videos. As stated above **only valid users can post it** <br/>
  
  <img src="https://user-images.githubusercontent.com/62353456/114281509-62c9e780-9a5c-11eb-8d96-8f5fd45ad4bd.jpg" width="500" height="180" />
  <img src="https://user-images.githubusercontent.com/62353456/114296781-b70bb080-9aca-11eb-9571-111980514376.jpg" width="400" height="400" />
  


  
- Senders Posts:
 It contains Post content like texts, slideshow of multiple images and videos attached. It also contains a like button and comment section.


### `Society`

1) At first it contains a society landing page, where all societies info are rendering and a footer of rights and developers info is present.
   It contains a society navigating button and in order to access the different socities you need to click it. <br />

<img src="https://user-images.githubusercontent.com/62353456/114297594-07850d00-9acf-11eb-996b-46d0d9df10aa.png" data-canonical-src="https://user-images.githubusercontent.com/68541151/114292728-36d75200-9aae-11eb-8253-de61b125a4bd.png"  />

<br/>

2) A Sliding Sidebar which contains multiple societies channels and by clicking the channel you will navigate to that particular society page.
 
 ![screencapture-nescii-1o1-web-app-societies-IrsB2cfJ5GAp3x3pDo4H-2021-04-11-13_31_50](https://user-images.githubusercontent.com/62353456/114296718-6a27da00-9aca-11eb-84b1-7a95d45ace23.png)


### `Notices`
Circulars released by the Admin are automatically updated in Nescii so that students can remain updated about the college activities. <br/>
<img src="https://user-images.githubusercontent.com/68541151/114292558-e9a6b080-9aac-11eb-9149-e7b1f352f43f.jpg" width="450" height="500" />

### `Google Calendars Integration`
Events added by the College Societies can be easily added to your Google Calendars using the API Integration. Never forget the weekly society meets so that you can get that POR!<br/>
![events](https://user-images.githubusercontent.com/62353456/114296484-36988000-9ac9-11eb-8219-514bcffc302a.jpg)





