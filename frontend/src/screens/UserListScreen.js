import React, {useState, useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Loader from '../components/Loader'
import Message from '../components/Message'
import { getUserList } from '../actions/userActions'

function UserListScreen() {

    const userList = useSelector(state => state.userList)
    const { users, loading, error } = userList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if(userInfo){
            if(userInfo.isAdmin){
                dispatch(getUserList())
            } else{
                navigate('/')
            }
        } else{
            navigate('/login?redirect=admin/all-users')
        }
    }, [dispatch])

    const deleteHandler = (id) => {
        console.log(id)
    }
    return (
        <div>
            <h2>Users</h2>
            { error && <Message variant="danger">{error}</Message>}
            { loading && <Loader /> }
            { users && 
                (
                    <Table striped responsive bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Name</th>
                                <th>Role</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            { users.map(user => (
                                <tr>
                                    <td>{ String(user._id).padStart(5, '0') }</td>
                                    <td>{ user.username }</td>
                                    <td>{ user.email }</td>
                                    <td>{ user.name }</td>
                                    <td>{ user.isAdmin ? 'Admin' : 'User' }</td>
                                    <td>
                                        <LinkContainer to={`/admin/user/${user._id}`}>
                                            <Button variant="light" className="btn-sm"><i className="fas fa-edit"></i></Button>
                                        </LinkContainer>
                                    </td>
                                    <td><Button variant="danger" className="btn-sm"><i className="fas fa-trash" onClick={() => deleteHandler(user._id)}></i></Button></td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )
            }
        </div>
    )
}

export default UserListScreen