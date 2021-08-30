import React, {useState} from 'react'
import { connect } from 'react-redux'
import {getData} from './../ducks/dataReducer'
import { withStyles } from '@material-ui/core/styles'
import {Typography} from '@material-ui/core'

const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        '& > *': {
          margin: '1%',
        },
        marginLeft: '10px'
    },
    sectionText: {
        marginLeft: '1rem'
    }
  });

function Details(props) {
    const [audiences] = useState(props.dataSend.data)
    console.log(props.dataSend.data)
    const {classes} = props

    let audience = audiences.filter((e) => {
        return e.id === props.match.params.id
    })
    audience = audience[0]

    return(
        <div className={classes.root}>
            <section>
                <Typography>
                    <b>Dimension:</b> <p className={classes.sectionText}>{audience.dimensions[0].type}</p>
                    <b>Filters:</b>{audience.dimensions[0].filters.map((e, i) => {
                        return <p className={classes.sectionText} key={i}>
                            {e}
                        </p>
                    })}
                    <b>Size:</b> <p className={classes.sectionText}>{audience.dimensions[0].size}</p>
                </Typography> 
            </section>
            <br/>
            <section>
                <Typography>
                    <b>Dimension:</b> <p className={classes.sectionText}>{audience.dimensions[1].type}</p>
                    <b>Filters:</b>{audience.dimensions[1].filters.map((e, i) => {
                        return <p className={classes.sectionText} key={i}>
                            {e}
                        </p>
                    })}
                    <b>Size:</b> <p className={classes.sectionText}>{audience.dimensions[1].size}</p>
                </Typography>

            </section>

        </div>
    )
}

function mapStateToProps(state) {

    return({ 
        dataSend: state.dataSend
    })
  }

export default connect(mapStateToProps, {getData})(withStyles(styles)(Details))