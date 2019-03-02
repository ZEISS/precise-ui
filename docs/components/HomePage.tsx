import * as React from 'react';
import { styled, Headline, Icon, IconName, Button, BodyText, StackPanel, StackItem, colors } from '../../src';

// @ts-ignore
import Markdown from 'react-styleguidist/lib/rsg-components/Markdown';

const HeadIcon = styled(Icon)`
  vertical-align: text-bottom;
  margin-right: 0.5em;
`;

const Footer = styled.div`
  text-align: center;
  font-size: 0.8em;

  i {
    vertical-align: middle;
  }
`;

const LogoImage = styled.img`
  margin: 0 auto;
  width: 300px;
  display: block;
`;

const Message = styled.p`
  max-width: 450px;
  margin: 1em auto;
  font-size: 1.5em;
`;

const Question = styled.b`
  margin-bottom: 0.5em;
  display: block;
`;

const Answer = styled.i`
  display: block;
  margin-bottom: 1em;
`;

const Supporter = styled(StackItem)`
  width: 128px;
  height: 128px;
  margin: 1em;

  img {
    height: 128px;
  }
`;

const TopContainer = styled.div`
  text-align: center;
  margin-bottom: 3em;
`;

const InfoContainer = styled.div`
  margin-bottom: 3em;
`;

interface HeadProps {
  icon: IconName;
  title: string;
}

const Head: React.SFC<HeadProps> = ({ icon, title }) => (
  <Headline level={5}>
    <HeadIcon name={icon} size={1.3} />
    {title}
  </Headline>
);

function codeBlock(language: string, block: string) {
  return `${cb}${language}\n${block}\n${cb}`;
}

const cb = '```';
// edit via https://codepen.io/anon/pen/GzRYXd
const installation = codeBlock('sh', 'npm i precise-ui');
const dependencies = codeBlock('sh', 'npm i react@16 styled-components@2');
const usageExample = codeBlock(
  'jsx',
  `<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> { Rating, TextField } <span class="hljs-keyword">from</span> <span class="hljs-string">'precise-ui'</span>;

<span class="hljs-keyword">const</span> App = <span class="hljs-function"><span class="hljs-params">props</span> =&gt;</span> (
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>How do you like Precise UI?<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Rating</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Tell us why what we can do better!<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">TextField</span> <span class="hljs-attr">multiline</span> /&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
);</span>`,
);

export const HomePage: React.SFC = () => (
  <div>
    <TopContainer>
      <LogoImage src="precise-logo.svg" />
      <Message>An extensive React component library with batteries included.</Message>
      <Button to="/getting-started">Getting Started</Button>
    </TopContainer>
    <InfoContainer>
      <Head icon="Widgets" title="Prerequisites" />
      <BodyText>
        Precise UI has been created for React 16 with styled-components 2. You will need to have these two dependencies
        installed.
      </BodyText>
      <Markdown text={dependencies} />
      <BodyText>
        Precise UI works best with TypeScript, but can be used with ordinary JavaScript as well. Our package comes with
        a ready-to-use UMD bundle, an ES5, and a more modern ES6 version. We recommend using the ES6 version (default).
      </BodyText>
    </InfoContainer>
    <InfoContainer>
      <Head icon="FileDownload" title="Installation" />
      <BodyText>
        Install Precise UI directly via npm. There is no need for setting up some CSS as Precise UI is using
        styled-components.
      </BodyText>
      <Markdown text={installation} />
    </InfoContainer>
    <InfoContainer>
      <Head icon="Favorite" title="Usage" />
      <BodyText>
        Precise UI components just work out of the box. They play well with any other React components. Due to
        styled-components the styling is isolated and will not conflict with any existing stylesheets in your app.
      </BodyText>
      <Markdown text={usageExample} />
    </InfoContainer>
    <InfoContainer>
      <Head icon="HelpOutline" title="FAQ" />
      <Question>How can I report bugs?</Question>
      <Answer>
        Please go to our repository hosted on GitHub (follow the ribbon in the upper right corner). We use GitHub issues
        to organize our work on Precise UI. Every reported bug will be investigated and properly handled.
      </Answer>
      <Question>How is this different to, e.g., Bootstrap?</Question>
      <Answer>
        Bootstrap is a great framework for CSS with some loosely related JavaScript. It has been brought into instantly
        usable components for React in multiple implementation (e.g., Reactstrap). Nevertheless, Bootstrap is mostly
        concerned about smaller building blocks and leaves bigger components to the user. Furthermore, it does not
        contain additional helpers to make React development simpler / more direct. Precise UI tries to be focused on
        bringing larger (more opionionated and productivity-focused) components to life.
      </Answer>
    </InfoContainer>
    <InfoContainer>
      <Head icon="AccountBalance" title="Supporters" />
      <StackPanel wrap>
        <Supporter nofill>
          <img src="https://zeiss.azureedge.net/zeiss-logo-a2f31c.svg" width="128" />
        </Supporter>
        <Supporter nofill>
          <img src="https://www.smapiot.com/en/wp-content/uploads/sites/2/2018/05/smapiot_logo.svg" width="128" />
        </Supporter>
      </StackPanel>
    </InfoContainer>
    <InfoContainer>
      <Head icon="Public" title="License" />
      <BodyText>Released under the MIT license. For details see our GitHub repository.</BodyText>
    </InfoContainer>
    <Footer>
      Made with <Icon name="Favorite" color={colors.purpleRed} size={1.5} /> in Munich.
    </Footer>
  </div>
);
