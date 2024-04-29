import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Sidebar from '../Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { Editor } from '@tinymce/tinymce-react';

import formValidationChecker from '../../ValidationCheckers/formValidationChecker';
import { addProduct } from "../../../Store/ActionCreators/ProductActionCreators"
import { getMaincategory } from "../../../Store/ActionCreators/MaincategoryActionCreators"
import { getSubcategory } from "../../../Store/ActionCreators/SubcategoryActionCreators"
import { getBrand } from "../../../Store/ActionCreators/BrandActionCreators"

export default function CreateProduct() {
    const editorRef = useRef(null);
    let [data, setData] = useState({
        name: "",
        maincategory: "",
        subcategory: "",
        brand: "",
        color: "",
        size: "",
        baseprice: "",
        discount: "",
        finalprice: "",
        stock: "In Stock",
        pic1: "",
        pic2: "",
        pic3: "",
        pic4: ""
    })
    let [errorMessages, setErrorMessage] = useState({
        name: "Name Field Must Required",
        color: "Color Field Must Required",
        size: "Size Field Must Required",
        baseprice: "Base Price Field Must Required",
        discount: "Discount Field Must Required",
        pic1: "Pic1 Field Must Required",
    })
    let [show, setShow] = useState(false)
    let dispatch = useDispatch()
    let MaincategoryStateData = useSelector((state) => state.MaincategoryStateData)
    let SubcategoryStateData = useSelector((state) => state.SubcategoryStateData)
    let BrandStateData = useSelector((state) => state.BrandStateData)
    let navigate = useNavigate()

    function getInputData(e) {
        setErrorMessage((old) => {
            return {
                ...old,
                [name]: formValidationChecker(e)
            }
        })
        let { name, value } = e.target
        setData((old) => {
            return {
                ...old,
                [name]: value
            }
        })
    }
    function getInputFile(e) {
        let { name, files } = e.target
        if (name === "pic1") {
            setErrorMessage((old) => {
                return {
                    ...old,
                    [name]: ""
                }
            })
        }
        setData((old) => {
            return {
                ...old,
                [name]: files[0].name
            }
        })
    }
    async function postData(e) {
        e.preventDefault()
        if (!(Object.keys(errorMessages).find((x) => errorMessages[x] && errorMessages[x] !== ""))) {
            let fp = data.baseprice - data.baseprice * data.discount / 100
            let formData = {
                name:data.name,
                maincategory:data.maincategory,
                subcategory:data.subcategory,
                brand:data.brand,
                color:data.color,
                size:data.size,
                baseprice:parseInt(data.baseprice),
                discount:parseInt(data.discount),
                finalprice:fp,
                stock:data.stock,
                description:editorRef.current,
                pic1:data.pic1,
                pic2:data.pic2,
                pic3:data.pic3,
                pic4:data.pic4
            }
            console.log(formData);
            // dispatch(addProduct({ ...data, finalprice: fp }))
            // navigate("/admin/product")
        }
        else
            setShow(true)
    }
    function getAPIData() {
        dispatch(getMaincategory())
        dispatch(getSubcategory())
        dispatch(getBrand())
        if(MaincategoryStateData.length && SubcategoryStateData.length && BrandStateData.length){
            setData((old)=>{
                return{
                    ...old,
                    'maincategory':MaincategoryStateData.slice(1).reverse()[0].name,
                    'subcategory':SubcategoryStateData.slice(1).reverse()[0].name,
                    'brand':BrandStateData.slice(1).reverse()[0].name,
                }
            })
        }
    }
    useEffect(() => {
        getAPIData()
    }, [MaincategoryStateData.length, SubcategoryStateData.length, BrandStateData.length])
    return (
        <>
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Admin</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><Link to="/" className='text-light'>Home</Link></li>
                    <li className="breadcrumb-item active text-white">Product</li>
                </ol>
            </div>
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='bg-primary text-center text-light p-2'>Product</h5>
                        <form onSubmit={postData}>
                            <div className="mb-3">
                                <label>Name<span className='text-danger'>*</span></label>
                                <input type="text" name="name" onChange={getInputData} className='form-control' placeholder='Product Name' />
                                {show ? <p className='text-danger text-capitalize my-2'>{errorMessages.name}</p> : ""}
                            </div>
                            <div className="row">
                                <div className="col-md-3 col-sm-6 col-12 mb-3">
                                    <label>Maincategory<span className='text-danger'>*</span></label>
                                    <select name="maincategory" onChange={getInputData} className='form-select'>
                                        {
                                            MaincategoryStateData.length && MaincategoryStateData.slice(1).reverse().map((item, index) => {
                                                return <option key={index}>{item.name}</option>
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col-md-3 col-sm-6 col-12 mb-3">
                                    <label>Subcategory<span className='text-danger'>*</span></label>
                                    <select name="subcategory" onChange={getInputData} className='form-select'>
                                        {
                                            SubcategoryStateData.length && SubcategoryStateData.slice(1).reverse().map((item, index) => {
                                                return <option key={index}>{item.name}</option>
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col-md-3 col-sm-6 col-12 mb-3">
                                    <label>Brand<span className='text-danger'>*</span></label>
                                    <select name="brand" onChange={getInputData} className='form-select'>
                                        {
                                            BrandStateData.length && BrandStateData.slice(1).reverse().map((item, index) => {
                                                return <option key={index}>{item.name}</option>
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col-md-3 col-sm-6 col-12 mb-3">
                                    <label>Stock<span className='text-danger'>*</span></label>
                                    <select name="stock" onChange={getInputData} className='form-select'>
                                        <option>In Stock</option>
                                        <option>Out Of Stock</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label>Color<span className='text-danger'>*</span></label>
                                    <input type="text" name="color" onChange={getInputData} className='form-control' placeholder='Product Color' />
                                    {show ? <p className='text-danger text-capitalize my-2'>{errorMessages.color}</p> : ""}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Size<span className='text-danger'>*</span></label>
                                    <input type="text" name="size" onChange={getInputData} className='form-control' placeholder='Product Size' />
                                    {show ? <p className='text-danger text-capitalize my-2'>{errorMessages.size}</p> : ""}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label>Base Price<span className='text-danger'>*</span></label>
                                    <input type="number" name="baseprice" onChange={getInputData} className='form-control' placeholder='Base Price' />
                                    {show ? <p className='text-danger text-capitalize my-2'>{errorMessages.baseprice}</p> : ""}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Discount<span className='text-danger'>*</span></label>
                                    <input type="number" name="discount" onChange={getInputData} className='form-control' placeholder='Discount' />
                                    {show ? <p className='text-danger text-capitalize my-2'>{errorMessages.discount}</p> : ""}
                                </div>
                            </div>
                            <div className="mb-3">
                                <label>Descriptiion</label>
                                {/* <textarea name="description" rows="5" className='form-control' placeholder='Description...' onChange={getInputData}></textarea> */}
                                <Editor
                                    apiKey='a5j53vjtw1k94lasjoug94e5p39nnbia5qnwqevs3f8btism'
                                    onInit={(evt, editor) => editorRef.current = editor}
                                    init={{
                                        height: 300,
                                        menubar: false,
                                        plugins: [
                                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                                        ],
                                        toolbar: 'undo redo | blocks | ' +
                                            'bold italic forecolor | alignleft aligncenter ' +
                                            'alignright alignjustify | bullist numlist outdent indent | ' +
                                            'removeformat | help',
                                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                    }}
                                />
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label>Pic1<span className='text-danger'>*</span></label>
                                    <input type="file" name="pic1" className='form-control' onChange={getInputFile} />
                                    {show ? <p className='text-danger text-capitalize my-2'>{errorMessages.pic1}</p> : ""}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Pic2</label>
                                    <input type="file" name="pic2" className='form-control' onChange={getInputFile} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label>Pic3</label>
                                    <input type="file" name="pic3" className='form-control' onChange={getInputFile} />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Pic4</label>
                                    <input type="file" name="pic4" className='form-control' onChange={getInputFile} />
                                </div>
                            </div>
                            <div className="mb-3">
                                <button type="submit" className='btn btn-primary text-light w-100'>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
