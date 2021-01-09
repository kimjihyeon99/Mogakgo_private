import React, { useState } from 'react';
import { Typography, Button, Form, message, Input } from 'antd';
import Icon from '@ant-design/icons';
import Dropzone from 'react-dropzone';
import Axios from 'axios';

const {Title} = Typography;
const {TextArea} = Input;

const privateOption = [
  {value:0, label:"Private"},
  {value:1, label:"Public"}
]
const categoryOption = [
  {value:0, label:"Film & Animation"},
  {value:1, label:"Autos & Vehicles"},
  {value:2, label:"Music"},
  {value:3, label:"Pets & Animals"}
]

function VideoUploadPage(){

  /*state에 value를 넣어둔 뒤 서버에 보낼 때 한꺼번에 보낼 수 있음*/
  const [VideoTitle, setVideoTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Private, setPrivate] = useState(0);
  const [Category, setCategory] = useState("Film & Animation");

  /*텍스트를 입력할 수 있도록 액션 추가*/
  const onTitleChange = (e) =>{
    setVideoTitle(e.currentTarget.value)
  }
  const onDescriptionChange = (e) =>{
    setDescription(e.currentTarget.value)
  }
  const onPrivateChagne = (e) =>{
    setPrivate(e.currentTarget.value)
  }
  const onCategoryChagne = (e) =>{
    setCategory(e.currentTarget.value)
  }
  const onDrop = (files) =>{
    let formData = new FormData;
    const config = {
      header: { 'content-type': 'multipart/form-data'}
    }
    formData.append("file", files[0])

    Axios.post('/api/video/uploadfiles', formData, config)
      .then(response =>{
        if(response.data.success){
          console.log(response.data);
        }else{
          alert('비디오 업로드를 실패했습니다.')
        }
      })
  }
  return(
    <div style={{maxWidth:'700px', margin:'2rem auto'}}>
      <div style={{textAlign:'center', marginBottom:'2rem'}}>
        <Title level={2}> Upload Video </Title>
      </div>

      <Form onSubmit>
        <div style={{display:'flex', justifyContent:'space-between'}}>
          <Dropzone
            onDrop = {onDrop}
            multiple={false}
            maxSize ={800000000}
          >
          {({getRootProps, getInputProps}) =>(
            <div style={{width:'300px',height:'240px', border:'1px solid lightgray',display:'flex',alignItems:'center',justifyContent:'center'}} {...getRootProps()}>
              <input {...getInputProps()}/>
             <Icon type="PlusOutlined" style={{fontSize:'3rem'}}/>
            </div>
          )}

          </Dropzone>


          <div>
            <img src alt />
          </div>
        </div>

        <br/>
        <br/>
        <label>Title</label>
        <Input
          onChange={onTitleChange}
          value={VideoTitle}
        />

        <br/>
        <br/>
        <label>Description</label>
        <TextArea
          onChange={onDescriptionChange}
          value={Description}
        />

        <br/>
        <br/>

        <select onChange={onPrivateChagne}>
        /*map이용해서 option 생성*/
        {privateOption.map((item, index)=>(
            <option key={index} value={item.value}>{item.label}</option>
        ))}

        </select>

        <br/>
        <br/>

        <select onChange={onCategoryChagne}>
          {categoryOption.map((item, index)=>(
            <option key={index} value={item.value}>{item.label}</option>
          ))}
        </select>

        <br/>
        <br/>

        <Button type="primary" size="large" onClick>
          Submit
        </Button>


      </Form>
    </div>
  )

}

export default VideoUploadPage
