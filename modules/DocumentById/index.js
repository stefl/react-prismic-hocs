//@flow
import React from 'react'
import { queryById } from '../queries'
import type { APIOptions } from 'prismic-javascript'

type Props = {
  url: string,
  id: string,
  apiOptions: APIOptions,
  queryKey: string,
  children: any,
  queryOptions: any
}


export default class DocumentById extends React.Component {
  props: Props;
  state: {
    loading: boolean,
    prismic: any,
    error: boolean | Error
  }

  static defaultProps = {
    queryKey: '',
    apiOptions: {},
    queryOptions: {}
  }
  constructor(props: Props) {
    super(props)

    this.state = {
      loading: true,
      prismic: false,
      error: false
    }
  }

  componentDidMount = () => {
    const _this = this
    queryById({ url: this.props.url, apiOptions: this.props.apiOptions, id: this.props.id, additionalOPtions: this.props.queryOptions })
    .then( (response: any) => {
      _this.setState({ loading: false, prismic: response })
    })
    .catch( (err: Error)=> {
      _this.setState({ loading: false, error: err })
    })
  }


  render() {
    const keyed = this.props.queryKey.length > 0
    const prismic = {
      queryKey: keyed ? this.props.queryKey: false,
      [keyed ? `${this.props.queryKey}Loading` : 'loading']: this.state.loading,
      [keyed ? `${this.props.queryKey}Error` : 'error']: this.state.error,
      [keyed ? `${this.props.queryKey}Prismic` : 'prismic']: this.state.prismic
    }
    return (
      <div>
        {this.props.children(prismic)}
      </div>
    )
  }
}


