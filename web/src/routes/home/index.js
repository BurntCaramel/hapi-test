import { h, Component } from 'preact';
import style from './style';
import Swatches from '../../components/swatches'

export default class Home extends Component {
	render() {
		return (
			<div class={style.home}>
				<Swatches />
			</div>
		);
	}
}
