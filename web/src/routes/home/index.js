import { h, Component } from 'preact';
import style from './style';
import Swatches from '../../components/Swatches'

export default class Home extends Component {
	render() {
		return (
			<div class={style.home}>
				<h1>Home</h1>
				<Swatches />
			</div>
		);
	}
}
