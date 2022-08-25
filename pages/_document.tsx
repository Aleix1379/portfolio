import { Head, Html, Main, NextScript } from 'next/document'
import React from 'react'

export default function Document() {
	return (
		<Html>
			<Head>
				<title>Aleix's portfolio</title>
			</Head>
			<body data-theme='dark'>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
