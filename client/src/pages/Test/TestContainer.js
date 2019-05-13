import { connect } from 'react-redux';
import * as CounterActions from '../../actions';

import Test from './Test';
import { bindActionCreators } from 'redux';

const mapStateToProps = state => ({
  counter: state.counter,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(CounterActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Test);
