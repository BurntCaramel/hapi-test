import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import linkState from 'linkstate'
import style from './style';
import { getURLForSVG, linearGradientRandom } from '../../api/swatches'

export default class Swatches extends Component {
	state = {
		width: 100,
		height: 100,
		shape: 'circle',
	}

	render({}, { width, height, shape }) {
		const svgURL = getURLForSVG(width, height, shape, linearGradientRandom)

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
					<select value={ shape } onChange={ linkState(this, 'shape') }>
						<option value='circle'>Circle</option>
						<option value='rect'>Rectangle</option>
					</select>
					<button>New</button>
				</div>
			</section>
		);
	}
}
