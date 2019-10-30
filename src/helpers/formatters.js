
export const removeAccents = string => {
	const accents = "ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝŔÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŕ";
	const alphabetic = "AAAAAAACEEEEIIIIDNOOOOOOUUUUYRsBaaaaaaaceeeeiiiionoooooouuuuybyr";
	let newString = "";

	for (let i = 0; i < string.length; i++) {
		let checkChange = false;
		for (let a = 0; a < accents.length; a++) {
			if (string.substr(i, 1) === accents.substr(a, 1)) {
				newString += alphabetic.substr(a, 1);
				checkChange = true;
				break;
			}
		}
		if (!checkChange) newString += string.substr(i, 1);
	}
	return newString;
}

export const cpfCnpjMask = number => {
	// CPF: 000.000.000-00
	// CNPJ: 00.000.000/0000-00
	const digits = number ? number.replace(/\D+/g, '') : '';

	if (digits && digits.length <= 11) {
		return number
			.replace(/\D/g, '')
			.replace(/(\d{3})(\d)/, '$1.$2')
			.replace(/(\d{3})(\d)/, '$1.$2')
			.replace(/(\d{3})(\d{1,2})/, '$1-$2')
	} else if (digits && digits.length > 11) {
		return number
			.replace(/\D/g, '')
			.replace(/(\d{2})(\d)/, '$1.$2')
			.replace(/(\d{3})(\d)/, '$1.$2')
			.replace(/(\d{3})(\d)/, '$1/$2')
			.replace(/(\d{4})(\d)/, '$1-$2')
			.replace(/(-\d{2})\d+?$/, '$1')
	}
	return digits;
}

export const phoneMask = number => {
	// PHONE: (00) 0000-0000
	// CELLPHONE: (00) 00000-0000
	const digits = number ? number.replace(/\D+/g, '') : '';

	if (digits && digits.length <= 10) {
		return number
			.replace(/\D/g, '')
			.replace(/(\d{2})(\d)/, '($1) $2')
			.replace(/(\d{4})(\d)/, '$1-$2')
	} else if (digits && digits.length > 10) {
		return number
			.replace(/\D/g, '')
			.replace(/(\d{2})(\d)/, '($1) $2')
			.replace(/(\d{5})(\d)/, '$1-$2')
			.replace(/(-\d{4})\d+?$/, '$1')
	}
	return digits;
}

export const zipCodeMask = number => {
	// ZIPCODE: 00.000-000
	const digits = number ? number.replace(/\D+/g, '') : '';

	if (digits.length > 0) {
		return number
			.replace(/\D/g, '')
			.replace(/(\d{2})(\d)/, '$1.$2')
			.replace(/(\d{3})(\d)/, '$1-$2')
			.replace(/(-\d{3})\d+?$/, '$1')
	}
	return digits;
}
