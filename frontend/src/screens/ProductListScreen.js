import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Col, Row, Table } from 'react-bootstrap'
import { createProduct, deleteProduct, listProduct } from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'
import Paginate from '../components/Paginate'
import MetaComponent from '../components/Meta'

const ProductListScreen = ({history, match}) => {
    const dispatch = useDispatch()

    const pageNumber = match.params.pageNumber || 1

    const productList = useSelector(state => state.productList)
    const { loading, error, products, page, pages } = productList

    const productDelete = useSelector(state => state.productDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete} = productDelete

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

     const productCreate = useSelector(state => state.productCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate

    useEffect(() => {
        dispatch({type: PRODUCT_CREATE_RESET})

        if(!userInfo.isAdmin){
            history.push('/login')
        } 

        if(successCreate){
            history.push(`/admin/product/${createdProduct._id}/edit`)
        } else{
            dispatch(listProduct('', pageNumber) )
        }
    }, [dispatch, history, userInfo, successCreate, createdProduct, successDelete, pageNumber])

    const deleteHandler = (id) => {
        if (window.confirm('Are You sure')) {
            dispatch(deleteProduct(id))
        }
    }

    const createPrductHandler = () =>{
        dispatch(createProduct())
    }
    return (
        <div>
            <Row className='align-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className="text-end">
                    <Button className='my-3' onClick={createPrductHandler}>
                        <i className="fas fa-plus"></i> Create Product
                    </Button>
                </Col>
            </Row>
            {loadingDelete && <Loader/>}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            {loadingCreate && <Loader/>}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
            {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
                <div>
                <MetaComponent title='Ecom - All Products'/>
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>BRAND</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map( product => {
                           return <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>
                                    ${product.price}
                                </td>
                                <td>
                                    {product.category}
                                </td>
                                <td>
                                    {product.brand}
                                </td>
                                <td>
                                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                        <Button variant='light' className='btn-sm'>
                                            <i className="fas fa-edit"></i>
                                        </Button>
                                    </LinkContainer>
                                    <Button variant='danger' className='btn-sm' onClick={() => {
                                        deleteHandler(product._id)
                                    }}>
                                        <i className="fas fa-trash"></i>
                                    </Button>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </Table>
                <Paginate pages={pages} page={page} isAdmin={true}/>
                </div>
            )}
        </div>
    )
}

export default ProductListScreen
