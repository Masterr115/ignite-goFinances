import React, { useState } from 'react';
import { ActivityIndicator, Alert, Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { useAuth } from '../../hooks/auth'
import { useTheme } from 'styled-components';

import AppleSvg from '../../assets/apple.svg';
import GoogleSvg from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';

import { SignInSocialButton } from '../../components/SignInSocialButton';

import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  FooterWrapper
} from './styles'


export function SignIn() {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const { signInWithGoogle, signInWithApple } = useAuth();

  async function handleSignInWithGoogle() {

    try{ 
      setIsLoading(true);
      await signInWithGoogle()
    } catch (err) {
      console.log(err)
      Alert.alert("Ocurreu um erro ao tentar se autenticar!")
      setIsLoading(false);
    }

  }

  async function handleSignInWithApple() {

    try {
      setIsLoading(true);
      return await signInWithApple()
    } catch (err) {
      console.log(err)
      Alert.alert("Ocurreu um erro ao tentar se autenticar!")
      setIsLoading(false);
    }

  }

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg
            width={RFValue(120)}
            height={RFValue(68)}
          />
          
          <Title>
            Controle suas {'\n'}
            finanças de forma {'\n'}
            muito simples {'\n'}
          </Title>

        </TitleWrapper>

        <SignInTitle>
          Faça seu login com {'\n'}
          uma das contas abaixo
        </SignInTitle>

      </Header>

      <Footer>
        <FooterWrapper>
          <SignInSocialButton 
            title="Entrar com Google"
            svg={GoogleSvg}
            onPress={handleSignInWithGoogle}
          />

          {
            Platform.OS == 'ios' &&
            <SignInSocialButton 
              title="Entrar com Apple"
              svg={AppleSvg}
              onPress={handleSignInWithApple}
            />
          }


        </FooterWrapper>

        {
          isLoading && 
          <ActivityIndicator 
            color={theme.colors.shape} 
            style={{ marginTop: 18 }}
          />
        }

      </Footer>
    </Container>
  )
}