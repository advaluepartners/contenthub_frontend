"use client";

import React from "react";
import Talk from "talkjs";

interface Props {}

interface State {
  appId: string | null;
  session: Talk.Session | null;
  ready: boolean;
  popup: Talk.Popup | null; // We will use this to hold the popup instance
}

interface TalkJSConfig {
  userid: string;
  appid: string;
}

class Home extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      appId: null,
      session: null,
      ready: false,
      popup: null, // Initialize popup as null
    };
  }

  componentDidMount() {
    this.fetchTalkJSConfig().then((config) => {
      if (config) {
        this.setState({ appId: config.appid }, () => {
          this.initializeTalkJS(config.userid, config.appid);
        });
      }
    });
  }

  async fetchTalkJSConfig(): Promise<TalkJSConfig | null> {
    try {
      const response = await fetch('http://localhost:1337/api/talk-js-configurations');
      if (!response.ok) throw new Error('Failed to fetch TalkJS configuration');
      const jsonResponse = await response.json();
      const configData = jsonResponse.data[0].attributes as TalkJSConfig;
      return configData;
    } catch (error) {
      console.error('Error fetching TalkJS configuration:', error);
      return null;
    }
  }

  async initializeTalkJS(userid: string, appid: string) {
    await Talk.ready;
    const me = new Talk.User({
      id: userid,
      name: "Barney Cook",
      role: "buyer",
    });

    const session = new Talk.Session({
      appId: appid,
      me,
    });

    this.setState({ session, ready: true }, () => {
      this.preparePopup();
    });
  }

  preparePopup() {
    const { session } = this.state;
    if (!session) {
      console.error("Session not initialized");
      return;
    }

    const conversationId = Talk.oneOnOneId(session.me, session.me);
    const conversation = session.getOrCreateConversation(conversationId);
    conversation.setParticipant(session.me);

    const popup = session.createPopup();
    popup.select(conversation);
    popup.mount({ show: false }); // Prepare popup but do not show immediately

    this.setState({ popup });

    const button = document.getElementById('btn-getInTouch');
    if (button) {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        if (this.state.popup) {
          this.state.popup.show();
        }
      });
    } else {
      console.error("Button #btn-getInTouch not found");
    }
  }

  render() {
    return (
      <div>
        {/* Button that triggers the popup. Ensure it's present in your UI. */}
        <button id="btn-getInTouch"></button>
        
      </div>
    );
  }
}

export default Home;





// "use client"

// import React from "react";
// import Talk from "talkjs";


// interface Props {}

// interface State {
//   appId: string | null;
//   session: Talk.Session | null;
//   ready: boolean;
//   minimized: boolean;
// }

// interface TalkJSConfig {
//   userid: string;
//   appid: string;
// }

// class Home extends React.Component<Props, State> {
//   chatContainerRef: React.RefObject<HTMLDivElement>;

//   constructor(props: Props) {
//     super(props);
//     this.state = {
//       appId: null,
//       session: null,
//       ready: false,
//       minimized: false,
//     };
//     this.chatContainerRef = React.createRef();
//   }

//   componentDidMount() {
//     this.fetchTalkJSConfig().then((config) => {
//       if (config) {
//         this.setState({ appId: config.appid }, () => {
//           this.initializeTalkJS(config.userid, config.appid);
//         });
//       }
//     });
//   }

//   async fetchTalkJSConfig(): Promise<TalkJSConfig | null> {
//     try {
//       const response = await fetch('http://localhost:1337/api/talk-js-configurations');
//       if (!response.ok) throw new Error('Failed to fetch TalkJS configuration');
//       const jsonResponse = await response.json();
//       const configData = jsonResponse.data[0].attributes as TalkJSConfig;
//       return configData;
//     } catch (error) {
//       console.error('Error fetching TalkJS configuration:', error);
//       return null;
//     }
//   }

//   async initializeTalkJS(userid: string, appid: string) {
//     await Talk.ready;
//     const me = new Talk.User({
//       id: userid,
//       name: "Barney Cook",
//       role: "buyer",
//     });

//     const session = new Talk.Session({
//       appId: appid,
//       me,
//     });

//     this.setState({ session, ready: true }, () => {
//       this.createAndMountChatbox();
//     });
//   }

//   createAndMountChatbox() {
//     if (!this.state.session || !this.chatContainerRef.current) {
//       console.error("Session not initialized or container ref not available");
//       return;
//     }

//     const conversationId = Talk.oneOnOneId(this.state.session.me, this.state.session.me);
//     const conversation = this.state.session.getOrCreateConversation(conversationId);
//     conversation.setParticipant(this.state.session.me);

//     const chatbox = this.state.session.createChatbox(conversation);
//     chatbox.mount(this.chatContainerRef.current);
//   }

//   toggleMinimize = () => {
//     this.setState((prevState) => ({ minimized: !prevState.minimized }));
//   };

//   render() {
//     const { ready, minimized } = this.state;

//     return (
//       <div>
//         <style jsx>{`
//           .chat-container {
//             height: ${minimized ? "50px" : "400px"};
//             width: 300px;
//             position: fixed;
//             bottom: 20px;
//             right: 20px;
//             border: 1px solid #ccc;
//             border-radius: 5px;
//             overflow: hidden; /* Hide content when minimized */
//             transition: height 0.3s ease-in-out; /* Smooth transition for height change */
//           }
//           .chat-header {
//             background-color: #f1f1f1;
//             padding: 10px;
//             display: flex;
//             justify-content: space-between;
//             align-items: center;
//             cursor: pointer;
//           }
//           .chat-content {
//             height: ${minimized ? "0" : "350px"};
//             overflow: hidden;
//             transition: height 0.3s ease-in-out;
//           }
//         `}</style>
//         <div className="chat-container">
//           <div className="chat-header" onClick={this.toggleMinimize}>
//             <div>Available 24/7!</div>
//             <button>{minimized ? "+" : "-"}</button>
//           </div>
//           <div className="chat-content" ref={this.chatContainerRef}>
//             {ready ? null : "Loading chat..."}
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default Home;
