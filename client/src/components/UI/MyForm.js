// Form UI
import React, { useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";

// const onFinish = (values) => {
//   console.log("Success:", values);
// };
// const onFinishFailed = (errorInfo) => {
//   console.log("Failed:", errorInfo);
// };

const MyForm = ({ onSubmit, isLogin }) => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const onInputHandler = (e) => {
    const { value, name } = e.currentTarget;

    setUserData((data) => ({ ...data, [name]: value }));

    if (userData.password != userData.confirm) {
      setErrorMessage("비밀번호가 일치하지 않습니다");
    } else {
      setErrorMessage("");
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    let body = {};
    if (isLogin) {
      body = {
        email: userData.email,
        password: userData.password,
      };
    } else {
      if (userData.password === userData.confirm) {
        body = {
          name: userData.name,
          email: userData.email,
          password: userData.password,
        };
      } else {
        return;
      }
    }
    onSubmit(body);
  };

  return (
    <Form
      onSubmit={onSubmit}
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      // onFinish={onFinish}
      // onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      {!isLogin && (
        <Form.Item
          label="Name"
          name="name"
          type="name"
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
          ]}
        >
          <Input value={userData.name} name="name" onChange={onInputHandler} />
        </Form.Item>
      )}
      <Form.Item
        label="Email"
        name="email"
        type="email"
        rules={[
          {
            required: true,
            message: "Please input your email!",
          },
        ]}
      >
        <Input value={userData.email} name="email" onChange={onInputHandler} />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password
          value={userData.password}
          name="password"
          onChange={onInputHandler}
        />
      </Form.Item>
      {!isLogin && (
        <>
          <Form.Item
            label="비밀번호 확인"
            name="confirm"
            type="confirm"
            rules={[
              {
                required: true,
                message: "비밀번호가 일치하지 않습니다!",
              },
            ]}
          >
            <Input
              value={userData.confirm}
              name="confirm"
              onChange={onInputHandler}
            />
          </Form.Item>
          <p>{errorMessage}</p>
        </>
      )}
      {/* 
    <Form.Item
      name="remember"
      valuePropName="checked"
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Checkbox>Remember me</Checkbox>
    </Form.Item> */}
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit" onClick={onSubmitHandler}>
          {isLogin ? "로그인" : "회원가입"}
        </Button>
      </Form.Item>
    </Form>
  );
};
export default MyForm;
