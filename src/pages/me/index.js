import {
  Alert,
  Button,
  Col,
  Image,
  PageHeader,
  Row,
  Space,
  Upload,
  Progress,
  Modal,
} from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { useTranslation } from 'react-i18next'; // For translation
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { removeAllAlerts, setSpiner } from '../../store/actions/AlertActions';
import { UpdateMe } from '../../store/actions/userActions';
import * as endpoints from '../../configs/endpointConfig';
import {
  LoadingOutlined,
  UploadOutlined,
  UserOutlined,
} from '@ant-design/icons';
import AxiosInstance from '../../util/intercepter';
import AutoHideAlert from '../../components/alert/AutoHideAlert';
import { setUserData } from '../../store/actions/authActions';
import showNotification from '../../components/alert/Alert';

function Me() {
  const history = useHistory();
  const { t } = useTranslation('words');
  const alert = useSelector((state) => state.alert.alert);
  const spinner = useSelector((state) => state.alert.spinner);

  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const [defaultFileList, setDefaultFileList] = useState([]);
  const [progress, setProgress] = useState(0);
  const [imagePreview, SetImagePreview] = useState({});

  useEffect(() => {
    dispatch(removeAllAlerts());
  }, []);

  const ProfileSchema = Yup.object().shape({
    FirstName: Yup.string()
      .required(t('Firstname_is_required'))
      .min(2, t('too_short')),
    LastName: Yup.string()
      .required(t('Lastname_is_required'))
      .min(2, t('too_short')),
    email: Yup.string()
      .email(t('email_not_valid'))
      .required(t('Email_is_required')),
  });
  const initialValues =
    auth && auth.user
      ? {
          FirstName: auth.user.FirstName,
          LastName: auth.user.LastName,
          email: auth.user.email,
        }
      : {};
  const doUpdateProfile = async (values) => {
    dispatch(removeAllAlerts());
    dispatch(setSpiner(true));
    dispatch(UpdateMe(values));
  };

  const uploadImage = async (options) => {
    const { onSuccess, onError, file, onProgress } = options;

    const fmData = new FormData();
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
      onUploadProgress: (event) => {
        const percent = Math.floor((event.loaded / event.total) * 100);
        setProgress(percent);
        if (percent === 100) {
          setTimeout(() => setProgress(0), 1000);
        }
        onProgress({ percent: (event.loaded / event.total) * 100 });
      },
    };
    fmData.append('photo', file);

    await AxiosInstance.patch(endpoints.UPDATE_ME, fmData, config).then(
      (response) => {
        onSuccess('Ok');
        dispatch(setUserData(response?.data?.user));
        showNotification('success', 'Image updated successfully', 'Success');
      }
    );
  };

  const handleOnChange = ({ file, fileList, event }) => {
    setDefaultFileList(fileList);
  };

  const handleProfilePreview = () => {
    SetImagePreview({
      previewImage: `${endpoints.BACKEND_URL}/img/users/${auth.user.photo}`,
      previewVisible: true,
      previewTitle: 'user',
    });
  };

  const handleCancel = () => SetImagePreview({ previewVisible: false });

  return (
    <div className="Me">
      <div className="user__profile">
        <PageHeader
          className="site-page-header"
          onBack={() => history.push('/')}
          title="Back"
        />

        <Row justify="center">
          <div onClick={handleProfilePreview} className="uploaded__image">
            <Avatar
              size={{ xs: 30, sm: 50, md: 70, lg: 80, xl: 100, xxl: 125 }}
              src={`${endpoints.BACKEND_URL}/img/users/${auth?.user?.photo}`}
              icon={<UserOutlined />}
            />
          </div>
        </Row>
        <Row justify="center">
          <Space>
            <div>
              <Upload
                listType="picture"
                accept="image/*"
                customRequest={uploadImage}
                onChange={handleOnChange}
              >
                {defaultFileList.length >= 1 ? null : (
                  <div>
                    <Button icon={<UploadOutlined />}>
                      Update Profile Image
                    </Button>
                  </div>
                )}
              </Upload>
              {progress > 0 ? <Progress percent={progress} /> : null}
            </div>
          </Space>
        </Row>

        <Formik
          initialValues={initialValues}
          validationSchema={ProfileSchema}
          onSubmit={doUpdateProfile}
        >
          {(props) => {
            const {
              values,
              touched,
              errors,
              dirty,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit,
              handleReset,
            } = props;
            return (
              <Form onSubmit={handleSubmit}>
                <Row justify="center">
                  <Col span={12}>
                    {alert && alert.message && (
                      <AutoHideAlert
                        title={alert.title}
                        message={alert.message}
                        type={alert.type}
                        timeout={alert.timeout}
                      />
                    )}
                  </Col>
                </Row>
                <Row justify="center">
                  <Col span={12}>
                    <div className="form__group">
                      <input
                        type="text"
                        name="FirstName"
                        id="FirstName"
                        placeholder={t('firstname')}
                        value={values.FirstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="form__input"
                      />
                      <label htmlFor="FirstName" className="form__label">
                        {t('firstname')}
                      </label>
                      {errors.FirstName && touched.FirstName && (
                        <span className="form__error">{errors.FirstName}</span>
                      )}
                    </div>
                    <div className="form__group">
                      <input
                        type="text"
                        name="LastName"
                        id="LastName"
                        placeholder={t('lastname')}
                        value={values.LastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="form__input"
                      />
                      <label htmlFor="LastName" className="form__label">
                        {t('lastname')}
                      </label>
                      {errors.LastName && touched.LastName && (
                        <span className="form__error">{errors.LastName}</span>
                      )}
                    </div>
                    <div className="form__group">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder={t('email')}
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="form__input"
                      />
                      <label htmlFor="email" className="form__label">
                        {t('email')}
                      </label>
                      {errors.email && touched.email && (
                        <span className="form__error">{errors.email}</span>
                      )}
                    </div>
                  </Col>
                </Row>
                <Row justify="center">
                  <Col span={12}>
                    <button
                      type="submit"
                      className="btn btn--green"
                      style={{ marginTop: '3rem' }}
                    >
                      {spinner ? (
                        <LoadingOutlined style={{ fontSize: '2.5rem' }} spin />
                      ) : (
                        'SAVE'
                      )}
                    </button>
                  </Col>
                </Row>
              </Form>
            );
          }}
        </Formik>
      </div>
      <Modal
        visible={imagePreview.previewVisible}
        title={imagePreview.previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt="example"
          style={{ width: '100%' }}
          src={imagePreview.previewImage}
        />
      </Modal>
    </div>
  );
}

export default Me;
