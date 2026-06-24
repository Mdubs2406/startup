# Ripple

A community oriented web applicated indented to promote acts of service and goodwill. Ripple provides daily inspiration for good deeds and hosts a community message board where users can advertise service opportunities.

### Elevator pitch

Do you want to help the world become a better place, but just feel overwhelmed by how much needs to be accomplished? The Ripple application provides daily inspiration for simples acts of service that can be seemlessly integrated into your normal routine. When you complete an act of service, you can mark it done to update a running count of good deeds and record your experience in a digital journal. Additionally, if you are aware of service opportunities in your community, you can post on a community message board to raise awareness of that need. The message board is upadated in realtime to provide users with easy access to the most recent and relavent information. 

### Design

![Design for login page](images/ripple_login.png)

![Design for homepage](images/ripple_home.png)
Design images created using Figma

Sequence diagram depicting how users interact with backend.

```mermaid
sequenceDiagram
    actor Matt
    actor Becky
    Matt->>Server: Records act of service
    Server -->>Matt: Update good deeds count
    Server -->>Becky: Update good deeds count
    Becky->>Server: Post on message board
    Server -->>Matt: Becky's post
```

### Key features

- Secure login over HTTPS
- Display daily service inspiration on homepage
- Display total acts of service by all users and today's total on homepage
- Display current daily streak for the user
- Ability to mark an act of service completed
- Update service totals in realtime
- Ability to record service experience in a digital journal
- Digital journal data stored and retrivable
- Ability to veiw service opportunities on community message board 
- Ability to post about service opportunites on the message board
- Message board updated in realtime with each new post

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - Using correct HTML structure, this application will have four HTML pages. The homepage (where daily service inpsiration is displayed), a second for login, a third for the digitial journal, and a fourth for the community message board.
- **CSS** - Application styling that allows easy veiwing on all screen sizes, maintaining good whitespace, readablity, and functional element access.
- **React** - Provides functionality for login, marking good deeds completed, displaying good deeds total, and backend endpoint calls.
- **Service** - Backend sercice with endpoints for:
    - Register, login, and logout users. Credentials securely stored in database. Users cannot create journal entries or posts unless authenticated.
    - Creating digital journal entries.
    - Retriving digital journal contents.
    - Creating message boarrd posts.
    - Retriving message board posts.
- **DB/Login** - Store login infromation, users, journal entries, and community posts in database.
- **WebSocket** - Whenever a user marks the daily service inspiration complete, the total and daily good deeds counters will be updated and boarcast to all users. Whenever a user posts about a service opportunity to the message board, that new post will be boardcast to all users.

## 🚀 Specification Deliverable

> [!NOTE]
> Fill in this sections as the submission artifact for this deliverable. You can refer to this [example](https://github.com/webprogramming260/startup-example/blob/main/README.md) for inspiration.

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] I completed the prerequisites for this deliverable (Git commit requirement)
- [ ] Proper use of Markdown
- [x] A concise and compelling elevator pitch
- [x] Description of key features
- [x] Description of how you will use each technology
- [x] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Rented EC2 server** - I did not complete this part of the deliverable.
- [ ] **Leased domain name** - I did not complete this part of the deliverable.
- [ ] **Server accessible** from my domain: [https://yourdomainnamehere.click](https://yourdomainnamehere.click) - I did not complete this part of the deliverable.

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [ ] **HTML pages** - I did not complete this part of the deliverable.
- [ ] **Proper HTML element usage** - I did not complete this part of the deliverable.
- [ ] **Links** - I did not complete this part of the deliverable.
- [ ] **Text** - I did not complete this part of the deliverable.
- [ ] **3rd party API placeholder** - I did not complete this part of the deliverable.
- [ ] **Images** - I did not complete this part of the deliverable.
- [ ] **Login placeholder** - I did not complete this part of the deliverable.
- [ ] **DB data placeholder** - I did not complete this part of the deliverable.
- [ ] **WebSocket placeholder** - I did not complete this part of the deliverable.

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [ ] **Visually appealing colors and layout. No overflowing elements.** - I did not complete this part of the deliverable.
- [ ] **Use of a CSS framework** - I did not complete this part of the deliverable.
- [ ] **All visual elements styled using CSS** - I did not complete this part of the deliverable.
- [ ] **Responsive to window resizing using flexbox and/or grid display** - I did not complete this part of the deliverable.
- [ ] **Use of a imported font** - I did not complete this part of the deliverable.
- [ ] **Use of different types of selectors including element, class, ID, and pseudo selectors** - I did not complete this part of the deliverable.

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [ ] **Bundled using Vite** - I did not complete this part of the deliverable.
- [ ] **Components** - I did not complete this part of the deliverable.
- [ ] **Router** - I did not complete this part of the deliverable.

## 🚀 React part 2: Reactivity deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [ ] **All functionality implemented or mocked out** - I did not complete this part of the deliverable.
- [ ] **Hooks** - I did not complete this part of the deliverable.

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [ ] **Node.js/Express HTTP service** - I did not complete this part of the deliverable.
- [ ] **Static middleware for frontend** - I did not complete this part of the deliverable.
- [ ] **Calls to third party endpoints** - I did not complete this part of the deliverable.
- [ ] **Backend service endpoints** - I did not complete this part of the deliverable.
- [ ] **Frontend calls service endpoints** - I did not complete this part of the deliverable.
- [ ] **Supports registration, login, logout, and restricted endpoint** - I did not complete this part of the deliverable.
- [ ] **Uses BCrypt to hash passwords** - I did not complete this part of the deliverable.

## 🚀 DB deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [ ] **Stores data in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Stores credentials in MongoDB** - I did not complete this part of the deliverable.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [ ] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [ ] **Application is fully functional** - I did not complete this part of the deliverable.
