import React, { useState } from 'react';
import styled from 'styled-components/native';
import { BackHandler, Alert } from 'react-native';
import { vw } from 'react-native-expo-viewport-units';
import * as Animatable from 'react-native-animatable';

import Chrest from './components/Chrest';

export default function App({
  sale: saleValue = 45,
  specificator = '250 гр.',
  price = 120,
  currency = '₽',
  descriptionTitle = 'Перу',
  descriptionText = 'Не ягода, а волшебный эликсир молодости. Голубика входит в топ-5 продуктов с наиболее эффективными антиоксидантами в составе.  Один из самых изученных продуктов питания на земле с доказанной пользой. Крупные ягоды по 2-3 грамма, аппетитно покрытые пыльцой, созревают как в тенистых лесах, так и на фермах по всему миру. Наша отборная голубика прилетела самолетом из Марокко...',
  ...rest
}) {
  const [counter, setCounter] = useState(1);
  const [scroll, setScroll] = useState(0);
  const [openedDescr, setOpenedDescr] = useState(false);

  return (
    <FixedContainer>
      <ExitAppContainer disabled={scroll !== 0}>
        <Chrest onPress={() => BackHandler.exitApp()} />
      </ExitAppContainer>
      <Container onScroll={event => setScroll(event.nativeEvent.contentOffset.y)}>
        <PreviewContainer>
          <Preview source={require('./assets/Golubica.png')} />
          <SaleAlert>-{saleValue}&nbsp;%</SaleAlert>
        </PreviewContainer>
        <ContentContainer>
          <ExitAppContentContainer disabled={scroll === 0}>
            <Chrest onPress={() => BackHandler.exitApp()} reversedColor />
          </ExitAppContentContainer>
          <Title>
            Отборная голубика
          </Title>
          <Specificator>
            {specificator}
          </Specificator>
          <PriceContainer>
            <Price>{(price * (1 - saleValue/100))}&nbsp;{currency}</Price>
            { saleValue && (<PriceBeforeSale>{price}&nbsp;{currency}</PriceBeforeSale>) }
            <FormOrder>
              <ButtonCounter disabled={counter <= 1} onPress={() => setCounter(counter - 1)}>
                <ButtonCounterInner source={require('./assets/minus.png')} />
              </ButtonCounter>
              <InputCountrer
                keyboardType='numeric'
                value={'' + counter}
                onChangeText={(e) => setCounter(Number(`${e}`.replace(/[\s\D\.\,\-]/g, '')) || 1)}
              />
              <ButtonCounter onPress={() => setCounter(counter + 1)}>
                <ButtonCounterInner source={require('./assets/plus.png')} />
              </ButtonCounter>
            </FormOrder>
          </PriceContainer>
          <Divider />
          <DescriptionTitle>{descriptionTitle}</DescriptionTitle>
          <DescriptionText
            transition="maxHeight"
            easing="ease-out"
            duration={1000}
            activated={openedDescr}
          >
            {descriptionText}
          </DescriptionText>
          {
            !openedDescr && (
              <MoreBtn onPress={() => setOpenedDescr(true)}>
                <MoreBtnText>
                  Читать подробности
                </MoreBtnText>
              </MoreBtn>
            )
          }
        </ContentContainer>
      </Container>
      <BuyContainer>
        <SummPriceText>{counter * (price * (1 - saleValue / 100))}&nbsp;{currency}</SummPriceText>
        <BuyButton onPress={() => Alert.alert('Добавление', 'Товар успешно добавлен')}>
          <BuyButtonText>
            Добавить&nbsp;
            <BuyButtonIcon source={require('./assets/buyCart.png')} />
          </BuyButtonText>
        </BuyButton>
      </BuyContainer>
    </FixedContainer>
  );
}


const FixedContainer = styled.View`
  position: relative;
  z-index: 1;
  padding-bottom: 64px;
`;
const Container = styled.ScrollView`
  display: flex;
  flex-direction: column;
`;
const PreviewContainer = styled.View`
  position: relative;
`;
const Preview = styled.Image`
  width: 100%;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;
const ExitAppContainer = styled.View`
  position: absolute;
  top: 18px;
  right: 18px;
  z-index: ${p => p.disabled ? 0 : 1};
  opacity: ${p => p.disabled ? 0 : 1};
`;
const ExitAppContentContainer = styled.View`
  position: absolute;
  top: 26px;
  right: 18px;
  z-index: ${p => p.disabled ? 0 : 1};
  opacity: ${p => p.disabled ? 0 : 1};
`;
const SaleAlert = styled.Text`
  position: absolute;
  bottom: 16px;
  left: 16px;
  width: 75px;
  height: 40px;
  line-height: 40px;
  border-radius: 160px;
  background: #F15E22;
  text-align: center;
  color: white;
  font-size: 18px;
  font-weight: bold;
`;
const ContentContainer = styled.View`
  position: relative;
  padding: 24px 16px;
`;
const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
`;
const Specificator = styled.Text`
  margin-top: 8px;
  font-size: 16px;
  color: #78797A;
`;
const PriceContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: center;
  margin-top: 8px;
  line-height: 40px;
`;
const Price = styled.Text`
  color: #F15E22;
  font-size: 18px;
  font-weight: bold;
`;
const PriceBeforeSale = styled.Text`
  color: black;
  text-decoration: line-through;
  margin-left: 16px;
  font-size: 18px;
  font-weight: bold;
`;
const FormOrder = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  max-width: 128px;
  margin-left: auto;
`;
const ButtonCounter = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: #F15E22;
  border-radius: 8px;
`;
const ButtonCounterInner = styled.Image``;
const InputCountrer = styled.TextInput`
  flex: 1;
  margin: 0 4px;
  text-align: center;
  line-height: 40px;
  font-size: 18px;
  font-weight: bold;
`;
const Divider = styled.View`
  margin-top: 24px;
  margin-bottom: 19px;
  height: 1px;
  width: ${vw(91)}px;
  background: #DFE2E9;
`;
const DescriptionTitle = styled.Text`
  color: #78797A;
  font-size: 20px;
  line-height: 20px;
  margin-bottom: 16px;
`;
const DescriptionText = styled(Animatable.Text)`
  color: #78797A;
  font-size: 16px;
  line-height: 20px;
  max-height: ${p => p.activated ? '1000px' : '68px'}
`;
const MoreBtn = styled.TouchableHighlight`
  margin-top: 16px;
  background: white;
  height: 40px;
  width: ${vw(91)}px;
  border-radius: 8px;
  border: 1px solid #DFE2E9;
  shadow-color: black;
  shadow-offset: 0 5px;
  shadow-opacity: 0.1;
  shadow-radius: 10px;
  elevation: 1;
`;
const MoreBtnText = styled.Text`
  font-size: 14px;
  line-height: 40px;
  text-align: center;
  color: #74767A;
`;
const BuyContainer = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  padding: 12px 16px;
  background: white;
  shadow-color: black;
  shadow-offset: 0 16px;
  shadow-opacity: 0.9;
  shadow-radius: 16px;
  elevation: 16;
`;
const SummPriceText = styled.Text`
  font-weight: bold;
  font-size: 24px;
  line-height: 24px;
`;
const BuyButton = styled.TouchableOpacity`
  height: 40px;
  width: 128px;
  background: #F15E22;
  border-radius: 8px;
`;
const BuyButtonText = styled.Text`
  display: flex;
  align-items: center;
  align-content: center;
  color: white;
  font-weight: bold;
  font-size: 16px;
  line-height: 40px;
  text-align: center;
`;
const BuyButtonIcon = styled.Image`
  margin-left: 4px;
`;
