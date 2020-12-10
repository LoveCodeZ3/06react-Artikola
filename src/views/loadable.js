//只是解释 react-loadable
//自己定义loadeble   懒路由
import React, {Component} from 'react'

const Loadable = ({
                    loader,
                    loading: Loading
                  }) => {
  return class LoadableComponent extends Component {
    state = {
      LoadedComponent: null
    }

    componentDidMount() {
      //import ('./Dashboard')  ==== loader()  这个的意思
      console.log(loader())
      loader()
        .then(resp => {
          this.setState({
            LoadedComponent: resp.default
          })
        })
    }

    render() {

      const {
        LoadedComponent
      } = this.state
      console.log(LoadedComponent)
      return (

        LoadedComponent
          ?
          <LoadedComponent/>
          :
          <Loading/>
      )
    }
  }
}
export default Loadable
