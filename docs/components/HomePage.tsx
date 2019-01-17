import * as React from 'react';
import { styled, Headline, Icon, IconName, Button, BodyText, StackPanel, StackItem } from '../../src';

const HeadIcon = styled(Icon)`
  vertical-align: text-bottom;
  margin-right: 0.5em;
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

const installation = `npm i precise-ui`;

const dependencies = `npm i react@16 styled-components@2`;

const usageExample = `import * as React from 'react';
import { Rating, TextField } from 'precise-ui';

const App = props => (
  <div>
    <p>How do you like Precise UI?</p>
    <Rating />
    <p>Tell us why what we can do better!</p>
    <TextField multiline />
  </div>
);`;

const CodeBlock = styled.pre`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
    'Droid Sans', 'Helvetica Neue', sans-serif;
  font-size: 13px;
  line-height: 1.5;
  color: #333;
  white-space: pre;
  background-color: #f5f5f5;
  padding: 8px 16px;
  border: 1px #e8e8e8 solid;
  border-radius: 3px;
  margin-top: 0;
  margin-bottom: 16px;
`;

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
        Precise UI has been created for React 16 with styled components. You will need to have these two dependencies
        installed.
      </BodyText>
      <CodeBlock>
        <code>{dependencies}</code>
      </CodeBlock>
      <BodyText>
        Precise UI works best with TypeScript, but can be used with ordinary JavaScript as well. Our package comes with
        a ready-to-use UMD bundle, an ES5, and a more modern ES6 version. We recommend using the ES6 version (default).
      </BodyText>
    </InfoContainer>
    <InfoContainer>
      <Head icon="FileDownload" title="Installation" />
      <BodyText>
        Install Precise UI directly via npm. There is no need for setting up some CSS as Precise UI is using styled
        components.
      </BodyText>
      <CodeBlock>
        <code>{installation}</code>
      </CodeBlock>
    </InfoContainer>
    <InfoContainer>
      <Head icon="Favorite" title="Usage" />
      <BodyText>
        Precise UI components just work out of the box. They play well with any other React components. Due to styled
        components the styling is isolated and will not conflict with any existing stylesheets in your app.
      </BodyText>
      <CodeBlock>
        <code>{usageExample}</code>
      </CodeBlock>
    </InfoContainer>
    <InfoContainer>
      <Head icon="HelpOutline" title="FAQ" />
      <Question>How can I report bugs?</Question>
      <Answer>
        Please go to our repository hosted on GitHub (follow the ribbon in the upper right corner). We use GitHub issues
        to organize our work on Precise UI. Every reported bug will be investigated and properly handled.
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
  </div>
);
