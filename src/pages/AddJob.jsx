import React from 'react'
import AutoInput from '../components/AutoInput'
import Select from '../components/Select'
import { statusOpt, typeOpt } from '../contants'
import SubmitButton from '../components/SubmitButton'
import { v4 } from 'uuid'
import api from '../utils/api'
import { useDispatch } from 'react-redux'
import { createJob,  } from '../app/slices/jobSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const AddJob = () => {
  const dispatch= useDispatch();
 const navigate = useNavigate()

// form gönderildiğinde çalışacka fonksiyon
  const handleSubmit= (e) => {
    e.preventDefault();
    //form data ouşturdu verileri teker teker almaya uğraşmamak için
    const formData = new FormData(e.target)
    //inputlardaki verileri nesneye dönüştürdük
  const newJobData = Object.fromEntries(formData.entries())

newJobData.id=v4()  //id ekledik
newJobData.date=Date.now()   //  tarih ekledik
// başarılı olursa
api.post("/jobs", newJobData).then(() => {
  toast.success("iş başarıyla eklendi")
// store a veriyi kaydet
dispatch(createJob(newJobData))
// anasayfaya yönlendir
navigate("/");
// başarısız olursa
}).catch(() => toast.error("İş Eklenirken sorun oluştu"));

};
  
  
  return (
    <div className='add-page'>
      <section className='container'>
        <h2>Yeni iş Ekle</h2>
        
        
        <form onSubmit={handleSubmit}>
          <AutoInput  label= "pozisyon" name="position"/>
          <AutoInput  label= "Şirket" name="company"/>
          <AutoInput  label= "Lokasyon" name="Location"/>

          <Select label={"Durum"} options={statusOpt} name="status"/>
          <Select label={"tür"} options={typeOpt} name={"type"}/>

          <div>
            <SubmitButton type="submit" text= {"Oluştur"}/>
          </div>

        </form>
      </section>
    </div>
  )
}

export default AddJob
