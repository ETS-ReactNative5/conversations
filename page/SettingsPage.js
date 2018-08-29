import React, { Component } from 'react';
import ReactNative, { Text, View , StyleSheet, Dimensions, PixelRatio, ImageBackground, ScrollView} from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import styles , {InsetView, InsetText, P,H1,H2,H3,HR, height, width, homeScreenImage} from "././styles.js";
import {getLocalizedString} from ".././Languages/LanguageChooser";
import {ProjectDescription, ProjectCredits} from "./AboutDescriptions";
import {saveSetting, getSetting} from ".././StorageUtils";


const pr = PixelRatio.get();
const radioToLanguageMap = {
  0: 'English',
  1 : 'Hindi'
};

const languageToRadioMap = {
  'English': 0,
  'Hindi': 1
};

const englishLocalization = getLocalizedString(radioToLanguageMap[0]);
const hindiLocalization = getLocalizedString(radioToLanguageMap[1]);

var radio_props = [
  {label: englishLocalization["languageName"], value: 0 },
  {label: hindiLocalization["languageName"], value: 1 }
];

export default class SettingsPage extends Component {
  constructor(props) {
    super(props);
    this.handleSettingsChanged = this.handleSettingsChanged.bind(this);
    this.state = {language: global.LANG};
  }

  handleSettingsChanged(value) {
      global.LANG = radioToLanguageMap[value];
      this.setState({language: global.LANG});
      saveSetting({name: "languagePreference", value: global.LANG});
  }

    onScroll = () => {
        this._userScrolled = true;
    }

  _scrollTo(name, animated=false) {
    let child = this.refs[name]

    if (child != null) {
      let nodeHandle = ReactNative.findNodeHandle(this._scroller);
      child.measureLayout(nodeHandle, (_x, y) => {
        this._scroller.scrollTo({x: 0, y: y, animated: animated});
          this._userScrolled = false;
      }, (error) => {
        console.log(error)
      })
    }
  }

  componentDidUpdate({state}) {
      let {navigation} = this.props;
      try {
          let target = navigation.state.params && navigation.state.params.targetSection,
              oldTarget = state.params && prevProps.state.params.targetSection;

          if (target !== null && oldTarget !== target)
              this._scrollTo(target);
      } catch(_) { }
  }

  render() {
    
    let localizedStrMap = getLocalizedString(global.LANG);
    let AboutDescription = ProjectDescription[global.LANG];
    
    return (
      <ImageBackground
          source={ homeScreenImage }
          imageStyle={{resizeMode: 'cover'}}
          style={{width: width, height: height}}
      >
        <ScrollView ref={scroller => { this._scroller = scroller; }}>
            <InsetView>
                 <H1>{localizedStrMap["settingsTitle"]}</H1>
                 <H2>{localizedStrMap["chooseLanguageOption"]}</H2>
                 <RadioForm
                    radio_props={radio_props}
                    buttonColor={'rgb(43,35,103)'}
                    selectedButtonColor={'rgb(43,35,103)'}
                    initial={languageToRadioMap[global.LANG]}
                    buttonStyle={styles.settingsRadioButton}
                    labelStyle={[styles.settingsRadioFormLabel, styles.fontSize10]}
                    onPress={(value) => {this.handleSettingsChanged(value)}}
                />
                <HR />

                  <H1>{localizedStrMap["aboutTheProjectTitle"]}</H1>
                  <AboutDescription />

                <HR />

                  <H1>{localizedStrMap["acknowledgementsTitle"]}</H1>
                  <ProjectCredits>{localizedStrMap}</ProjectCredits>


            </InsetView>
        </ScrollView>
      </ImageBackground>
    );
  }
}

SettingsPage.navConfig = {
  screen: SettingsPage
}
