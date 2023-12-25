import * as React from 'react';
import styles from './CreateInvoice.module.scss';
import classNames from 'classnames/bind';
import Box from '@mui/material/Box';
import InfoTitle from './InfoTitle/InfoTitle';
import Product from './Product/Product';
import Input from '~/components/Input';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Unstable_Grid2';

import { Container, Divider } from '@mui/material';
import AddMoreProduct from './AddMoreProduct/AddMoreProduct';
import ProductPackageInfo from './ProductPackageInfo/ProductPackageInfo';
import MinHeightTextarea from './MinHeightTextArea';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import DashboardLayout from 'src/layouts/dashboard';
import navConfig from '../config-navigation';
import AppWidgetSummary from '~/components/Page/Transaction/Statistics/components/WidgetSummary';
import axios from 'axios';

const defaultPackageInfo = {
  sumOfCOD: '',
  totalPackageValue: '',
  weight: '0',
  height: '10',
  length: '10',
  width: '10',
};
const defaultNote = {
  requiredNote: 'KHONGCHOXEMHANG',
  note: '',
};
const requiredNoteState = {
  'Không cho xem hàng': 'KHONGCHOXEMHANG',
  'Cho xem hàng không cho thử': 'CHOXEMHANGKHONGTHU',
  'Cho thử hàng': 'CHOTHUHANG',
};

const cx = classNames.bind(styles);
const defaultProduct = { name: '', code: '', weight: '200', quantity: '1' };

const CreateInvoice = () => {
  function handleAddMoreProduct() {
    setProductList([...productList, { ...defaultProduct, uuid: uuidv4() }]);
  }

  function handleDeleteProduct(index) {
    // console.log(productList[index]);
    var productListClone = [];
    for (let i = 0; i < productList.length; i++) {
      if (i !== index) productListClone.push(productList[i]);
    }
    // console.log(productListClone);
    setProductList(productListClone);
  }

  function handleUpdateProductInfo(index, updateInfo) {
    productList[index] = { ...productList[index], ...updateInfo };
    setProductList(productList);

    setPackageProductInfo({
      ...packageProductInfo,
      weight: productList.reduce((accumulator, currentValue, currentIndex, array) => {
        console.log(parseInt(currentValue.weight) * parseInt(currentValue.quantity));
        let newWeight = parseInt(currentValue.weight) * parseInt(currentValue.quantity);
        return accumulator + newWeight;
      }, 0),
    });
  }

  const [packageProductInfo, setPackageProductInfo] = useState(defaultPackageInfo);
  const [note, setNote] = useState(defaultNote);

  const [senderInfo, setSenderInfo] = useState({
    name: '',
    phoneNumber: '',
    province: '',
    district: '',
    ward: '',
  });

  const [receiverInfo, setReceiverInfo] = useState({
    name: '',
    phoneNumber: '',
    province: '',
    district: '',
    ward: '',
  });

  const [productList, setProductList] = useState([{ ...defaultProduct, uuid: uuidv4() }]);

  const createParcel = () => {
    axios
      .post(`http://localhost:1510/createParcel`, {
        data: {
          senderInfo: senderInfo,
          receiverInfo: receiverInfo,
          productList: productList,
          packageProductInfo: packageProductInfo,
          note: note,
        },
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <DashboardLayout navConfig={navConfig}>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4">TẠO ĐƠN HÀNG ĐIỂM GIAO DỊCH</Typography>

          {/* <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          Tạo tài khoản
        </Button> */}
        </Stack>
        <Card>
          <div
            style={{
              // width: '50%',
              // margin: 'auto',
              padding: '2rem',
            }}
          >
            <InfoTitle>Bên gửi</InfoTitle>
            <Grid container columnSpacing={10}>
              <Grid xs={12} sm={6} md={6}>
                <label>Số điện thoại</label>
                <Input
                  placeHolder={'Nhập số điện thoại'}
                  value={senderInfo.phoneNumber}
                  onChange={(value) => {
                    setSenderInfo({ ...senderInfo, phoneNumber: value });
                  }}
                ></Input>
                <label>Họ tên</label>
                <Input
                  placeHolder={'Nhập họ tên'}
                  value={senderInfo.name}
                  onChange={(value) => {
                    setSenderInfo({ ...senderInfo, name: value });
                  }}
                ></Input>
              </Grid>
              <Grid xs={12} sm={6} md={6}>
                <label>Tỉnh - thành phố </label>
                <Input
                  select
                  data={['Thái Nguyên', 'Hà Nội', 'Hải Phòng']}
                  value={senderInfo.province}
                  onChange={(value) => {
                    setSenderInfo({ ...senderInfo, province: value });
                  }}
                ></Input>
                <label>Quận - huyện</label>
                <Input
                  select
                  data={['Thái Nguyên', 'Hà Nội', 'Hải Phòng']}
                  value={senderInfo.district}
                  onChange={(value) => {
                    setSenderInfo({ ...senderInfo, district: value });
                  }}
                ></Input>
                <label>Phường - xã</label>
                <Input
                  select
                  data={['Thái Nguyên', 'Hà Nội', 'Hải Phòng']}
                  value={senderInfo.ward}
                  onChange={(value) => {
                    setSenderInfo({ ...senderInfo, ward: value });
                  }}
                ></Input>
              </Grid>
            </Grid>
            <Divider />

            <InfoTitle>Bên nhận</InfoTitle>
            <Grid container columnSpacing={10}>
              <Grid xs={12} sm={6} md={6}>
                <label>Số điện thoại</label>
                <Input
                  placeHolder={'Nhập số điện thoại'}
                  value={receiverInfo.phoneNumber}
                  onChange={(value) => {
                    setReceiverInfo({ ...receiverInfo, phoneNumber: value });
                  }}
                ></Input>
                <label>Họ tên</label>
                <Input
                  placeHolder={'Nhập họ tên'}
                  value={receiverInfo.name}
                  onChange={(value) => {
                    setReceiverInfo({ ...receiverInfo, name: value });
                  }}
                ></Input>
              </Grid>
              <Grid xs={12} sm={6} md={6}>
                <label>Tỉnh - thành phố</label>
                <Input
                  select
                  data={['Thái Nguyên', 'Hà Nội', 'Hải Phòng']}
                  value={receiverInfo.province}
                  onChange={(value) => {
                    setReceiverInfo({ ...receiverInfo, province: value });
                  }}
                ></Input>
                <label>Quận - huyện</label>
                <Input
                  select
                  data={['Thái Nguyên', 'Hà Nội', 'Hải Phòng']}
                  value={receiverInfo.district}
                  onChange={(value) => {
                    setReceiverInfo({ ...receiverInfo, district: value });
                  }}
                ></Input>
                <label>Phường - xã</label>
                <Input
                  select
                  data={['Thái Nguyên', 'Hà Nội', 'Hải Phòng']}
                  value={receiverInfo.ward}
                  onChange={(value) => {
                    setReceiverInfo({ ...receiverInfo, ward: value });
                  }}
                ></Input>
              </Grid>
            </Grid>
            <Divider />
            <InfoTitle>Sản phẩm</InfoTitle>
            <>
              {productList.map((value, index) => (
                <Product
                  key={value.uuid}
                  handleDeleteProduct={handleDeleteProduct}
                  handleUpdateProductInfo={handleUpdateProductInfo}
                  initValue={value}
                  index={index}
                ></Product>
              ))}
            </>
            <AddMoreProduct onClick={handleAddMoreProduct}></AddMoreProduct>
            <Divider />
            <InfoTitle>Thông tin gói hàng</InfoTitle>
            <ProductPackageInfo
              productList={productList}
              setPackageProductInfo={setPackageProductInfo}
              packageProductInfo={packageProductInfo}
            ></ProductPackageInfo>
            {/*{console.log(packageProductInfo)}*/}
            <Divider />
            <InfoTitle>Lưu ý - Ghi chú</InfoTitle>
            <Grid container spacing={3}>
              <Grid xs={12} sm={6} md={6}>
                <Box>
                  <label>Lưu ý giao hàng</label>
                  <Input
                    select
                    data={Object.keys(requiredNoteState)}
                    onChange={(value) => {
                      setNote({ ...note, requiredNote: requiredNoteState[value] });
                    }}
                    value={note.requiredNote}
                  ></Input>
                </Box>
              </Grid>
              <Grid xs={12} sm={6} md={6}>
                <Box>
                  <label>Ghi chú </label>
                  <MinHeightTextarea
                    value={note.note}
                    onChange={(value) => {
                      setNote({ ...note, note: value.target.value });
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
          </div>
        </Card>
      </Container>
      <button style={{ height: 200 }} onClick={() => createParcel()}>
        Tạo đơn hàng
      </button>
    </DashboardLayout>
  );
};
export default CreateInvoice;