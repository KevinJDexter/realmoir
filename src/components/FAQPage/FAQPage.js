import React, { Component } from 'react';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

import './FAQPage.css';

class AboutPage extends Component {
  render() {
    return (
      <div style={{height: window.innerHeight}}>
        <Header history={this.props.history} />
        <div className="mainView">
          <div className="faqPageContent">
            <div className="faqQuestions">
            <h2>About Page</h2>
              <p><strong>
                What is Realmoir?
              </strong></p>
              <p>
                Realmoir is a web application designed to assist authors in tracking their notes, as well as share their ideas with others.
              </p>
              <p><strong>
                If I share my concepts, can't someone else steal them?
              </strong></p>
              <p>
                Not at all! Once you've created your idea, it is officially yours, and anyone using your work is violating copywrite, us included!
              </p>
              <p><strong>
                How can I prevent people from seeing my content?
              </strong></p>
              <p>
                {`There are two ways to do this. If you want to conceal just specific things, like a character or an event, you can mark them as Private when creating or editing them. If you do this to a World, then anything existing in that world will automatically be Private. If you want to conceal everything, then you can edit your user to have everything as Private. By default, new users have all their content Public, but every world is defaulted to Private. With this, even if you never change your user settings, your content will always default to private. (Note: an item, the world it's in, or the user are marked as Private, the item will be Private. You must make ALL public for the item to be public.`})
              </p>
            </div>
          </div>
          <div className="sidebarDiv">
            <Sidebar />
          </div>
        </div>
      </div>
    )
  }
}

export default AboutPage;