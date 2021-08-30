import React, { useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import {getData} from './../ducks/dataReducer'
import { withStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import { TextField } from '@material-ui/core'
import {Typography} from '@material-ui/core'

const styles = () => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        '& > *': {
          margin: '1%',
        },
        marginLeft: '10px'
    },
    sectionUI: {
        display: 'flex',
        justifyContent: 'space-around'
    },
    buttonSpacing: {
        margin: '5px'
    },
    textFormat: {
        textAlign: 'center',
        padding: '10px'
    }
  });

function Audiences(props) {

  const [data, setData] = useState([])
  const [search, setSearch] = useState('')
  const [descid, setDescid] = useState(false)
  const [descname, setDescname] = useState(false)
  const [page, setPage] = useState(1)

    useEffect(() => {
        getDB()
        console.log('mount')
        setPage(1)

    }, [search])

  const getDB = () => {
    fetch('http://localhost:3000/audiences')
      .then(res => {
        return res.json()
      })
      .then(data => {
        setData(data)
        console.log(data)
        props.getData(data)
        console.log(props.dataSend.data)
      })
  }

  const OrderID = () => {
    if(descid === false){
      let desc_sort = data.sort((a, b) => parseFloat(b.id) - parseFloat(a.id));
      setData(desc_sort)
      setDescid(true)
    }else{
      let asc_sort = data.sort((a, b) => parseFloat(a.id) - parseFloat(b.id));
      setData(asc_sort)
      setDescid(false)
    }
  }

  const Ordername = () => {
    if(descname === false){
      let desc_sort = data.sort((a, b) => a.name.localeCompare(b.name));
      setData(desc_sort);
      setDescname(true)
    }else{
      let asc_sort = data.sort((a, b) => b.name.localeCompare(a.name));
      setData(asc_sort);
      setDescname(false)
    }
  }

  let mappedSearchBox = data.filter((e) => {
    if(e.id === search){
      return e.id === search
    }
    return e.name.toLowerCase().includes(search.toLowerCase()) 
  })

  console.log(mappedSearchBox)

  let totalPages = []

  let rounded_length_pages = Math.ceil(mappedSearchBox.length / 5)
  totalPages = rounded_length_pages

  let a = 1
  let b = 5

  if(page === 1){
    a = 0
    b = 5
  }else {
      a = (page - 1) * 5
      b = page * 5
  }

  let display_items = mappedSearchBox.slice(a, b)

  const {classes} = props

  return(
    <div className={classes.root}>

    <section className={classes.sectionUI}>
      <TextField placeholder="ID or Name" onChange={event => setSearch(event.target.value)}/>
      <div>
      <Button className = {classes.buttonSpacing} variant="contained" onClick={OrderID}>{descid === false ? 'Descending ID' : 'Ascending ID'}</Button>
      <Button className = {classes.buttonSpacing} variant="contained" onClick={Ordername}>{descname === false ? 'Descending Name' : 'Ascending Name'}</Button>
      </div>
    </section>

      {display_items.map((e, i) => { 
        return <div key={i} className={classes.textFormat}>
            <Link to={ `/audience/${e.id}`}>
            <Typography>{e.id}. {e.name}</Typography> 
            </Link>
        </div>
      })}

      <Button disabled={page < 2} onClick={() => {setPage(page - 1)}}>Last Page</Button>
      <Button disabled={page === totalPages} onClick={() => {setPage(page + 1)}}>Next Page</Button>

    </div>
  );
}

function mapStateToProps(state) {
    return({ 
        dataSend: state.dataSend
    })
}

export default connect(mapStateToProps, {getData})(withStyles(styles)(Audiences))