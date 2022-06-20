import React from 'react'
import { Typography, Container } from '@mui/material';
import { Header } from '../../Components'
import makeStyles from '@mui/styles/makeStyles';
import { Box } from "@mui/system";

const useStyles = makeStyles(theme => ({
    body: {
        flex: '1'
    },
    bodycontainer: {
        paddingLeft: "24px",
        height: "100%",
        maxWidth: "lg",
        display: 'flex',
        flexDirection: 'column',
    },
    header: {
        color: theme.palette.primary.main,
    }, bodyText: {
        paddingBottom: "5px",
        color: theme.palette.text.secondary
    }
}))

const Content = () => {
    const classes = useStyles()

    return (
        <Box className={classes.body}>
            <Container className={classes.bodycontainer}> 
            <h1 className={classes.header}>Agreement</h1>
            <p className={classes.bodyText}>By accessing this Website, you are agreeing to be bound by these Website Terms of Service and agree that you are responsible for the agreement in accordance with any applicable local laws. IF YOU DO NOT AGREE TO ALL THE TERMS AND CONDITIONS OF THIS AGREEMENT, YOU ARE NOT PERMITTED TO ACCESS OR USE OUR SERVICES.</p>
            <h2 className={classes.header}>Limitations</h2>
            <div className={classes.bodyText}>
                <p>You are responsible for your account's security and all activities on your account. You must not, in the use of this site, violate any applicable laws, including, without limitation, copyright laws, or any other laws regarding the security of your personal data, or otherwise misuse this site.</p>

                <p>We want to inform you that whenever you visit our Service, we collect information that your browser sends to us that is called Log Data. This Log Data may include information such as your computer’s Internet Protocol ("IP") address, browser version, pages of our Service that you visit, the time and date of your visit, the time spent on those pages, and other statistics.</p>
                
                <p>You agree that you will not upload, post, host, or transmit any content that:</p>

                <p>1. is unlawful or promotes unlawful activities;</p>

                <p>2. is or contains sexually obscene content;</p>

                <p>3. is libelous, defamatory, or fraudulent;</p>

                <p>4. is discriminatory or abusive toward any individual or group;</p>

                <p>5. is degrading to others on the basis of gender, race, class, ethnicity, national origin, religion, sexual preference, orientation, or identity, disability, or other classification, or otherwise represents or condones content that: is hate speech, discriminating, threatening, or pornographic; incites violence; or contains nudity or graphic or gratuitous violence;</p>
            
                <p>6. violates any person's right to privacy or publicity, or otherwise solicits, collects, or publishes data, including personal information and login information, about other Users without consent or for unlawful purposes in violation of any applicable international, federal, state, or local law, statute, ordinance, or regulation; or</p>
            
                <p>7. contains or installs any active malware or exploits/uses our platform for exploit delivery (such as part of a command or control system); or infringes on any proprietary right of any party, including patent, trademark, trade secret, copyright, right of publicity, or other rights.</p>

            </div>
            <div className={classes.header}>
                <h2>Privacy Policy</h2>
            </div>
            <div className={classes.bodyText}>
                <p>If you use our Services, you must abide by our Privacy Policy. You acknowledge that you have read our Privacy Policy and understand that it sets forth how we collect, use, and store your information. If you do not agree with our Privacy Statement, then you must stop using the Services immediately. Any person, entity, or service collecting data from the Services must comply with our Privacy Statement. Misuse of any User's Personal Information is prohibited. If you collect any Personal Information from a User, you agree that you will only use the Personal Information you gather for the purpose for which the User has authorized it. You agree that you will reasonably secure any Personal Information you have gathered from the Services, and you will respond promptly to complaints, removal requests, and 'do not contact' requests from us or Users.</p>

            </div>
            <div className={classes.header}>
            <h2>Limitations on Automated Use</h2>
            </div>
            <div className={classes.bodyText}>
                <p>While using our services, you may not:</p>

                    <li>use bots, hacks, or cheats while using our site;</li>
                    <li>tamper with or use non-public areas of the Services;</li>
                    <li>interfere with, or disrupt or attempt to interfere with or disrupt, the access of any User, host, or network, including, without limitation, by sending a virus to, spamming, or overloading the Services, or by scripted use of the Services in such a manner as to interfere with or create an undue burden on the Services.</li>

            </div>
            <div className={classes.header}><h2>Disclaimer</h2></div>
            <div className={classes.bodyText}>
                <p>EXCLUDING THE EXPLICITLY STATED WARRANTIES WITHIN THESE TERMS, WE ONLY OFFER OUR SERVICES ON AN 'AS-IS' BASIS. YOUR ACCESS TO AND USE OF THE SERVICES OR ANY CONTENT IS AT YOUR OWN RISK. YOU UNDERSTAND AND AGREE THAT THE SERVICES AND CONTENT ARE PROVIDED TO YOU ON AN 'AS IS,' 'WITH ALL FAULTS,' AND 'AS AVAILABLE' BASIS. WITHOUT LIMITING THE FOREGOING, TO THE FULL EXTENT PERMITTED BY LAW, FF DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT. TO THE EXTENT SUCH DISCLAIMER CONFLICTS WITH APPLICABLE LAW, THE SCOPE AND DURATION OF ANY APPLICABLE WARRANTY WILL BE THE MINIMUM PERMITTED UNDER SUCH LAW. FF MAKES NO REPRESENTATIONS, WARRANTIES, OR GUARANTEES AS TO THE RELIABILITY, TIMELINESS, QUALITY, SUITABILITY, AVAILABILITY, ACCURACY, OR COMPLETENESS OF ANY KIND WITH RESPECT TO THE SERVICES, INCLUDING ANY REPRESENTATION OR WARRANTY THAT THE USE OF THE SERVICES WILL (A) BE TIMELY, UNINTERRUPTED, OR ERROR-FREE, OR OPERATE IN COMBINATION WITH ANY OTHER HARDWARE, SOFTWARE, SYSTEM, OR DATA, (B) MEET YOUR REQUIREMENTS OR EXPECTATIONS, (C) BE FREE FROM ERRORS OR THAT DEFECTS WILL BE CORRECTED, OR (D) BE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS. FF ALSO MAKES NO REPRESENTATIONS OR WARRANTIES OF ANY KIND WITH RESPECT TO CONTENT; USER CONTENT IS PROVIDED BY AND IS SOLELY THE RESPONSIBILITY OF THE RESPECTIVE USER PROVIDING THAT CONTENT. NO ADVICE OR INFORMATION, WHETHER ORAL OR WRITTEN, OBTAINED FROM FF OR THROUGH THE SERVICES, WILL CREATE ANY WARRANTY NOT EXPRESSLY MADE HEREIN. FF DOES NOT WARRANT, ENDORSE, GUARANTEE, OR ASSUME RESPONSIBILITY FOR ANY USER CONTENT ON THE SERVICES OR ANY HYPERLINKED WEBSITE OR THIRD-PARTY SERVICE, AND FF WILL NOT BE A PARTY TO OR IN ANY WAY BE RESPONSIBLE FOR TRANSACTIONS BETWEEN YOU AND THIRD PARTIES. IF APPLICABLE LAW DOES NOT ALLOW THE EXCLUSION OF SOME OR ALL OF THE ABOVE IMPLIED OR STATUTORY WARRANTIES TO APPLY TO YOU, THE ABOVE EXCLUSIONS WILL APPLY TO YOU TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW.</p>
            </div>

            <div className={classes.bodyText}>
            <p>If you have any questions about our privacy policy, the data we hold on you, or you would like to exercise one of your data protection rights, please do not hesitate to contact us.</p>
            
            <p>Terms based on monkeytype.com Terms of Service.</p>
            </div>
            <div style={{paddingBottom:"50px"}}/>
            </Container>
        </Box>
    )
}

const Terms = (props) => {  
  return (
    <div style={{display:'flex', flexDirection:'column', height:'100vh'}}>
      <Header>
          <Typography variant="h6" color="primary">
              Terms
          </Typography>
      </Header>
      <Content />
    </div>
  )
}

export default Terms