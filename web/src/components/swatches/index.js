import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import linkState from 'linkstate'
import style from './style';
import { getURLForCircleSVG, linearGradientRandom } from '../../api/swatches'

export default class Swatches extends Component {
	state = {
		width: 100,
		height: 100
	}

	render({}, { width, height }) {
		const svgURL = getURLForCircleSVG(width, height, linearGradientRandom)

		return (
			<section class={style.section}>
				<div>
					<img src={ svgURL } />
				</div>
				<div>
					{ svgURL }
				</div>
				<div>
					<input type='number' value={ width } onInput={ linkState(this, 'width') } />
					<input type='number' value={ height } onInput={ linkState(this, 'height') } />
					<button>New</button>
				</div>
			</section>
		);
	}
}
