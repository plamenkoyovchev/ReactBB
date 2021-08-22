const rewire = require("rewire")
const Orders = rewire("./Orders")
const mapStateToProps = Orders.__get__("mapStateToProps")
// @ponicode
describe("mapStateToProps", () => {
    test("0", () => {
        let callFunction = () => {
            mapStateToProps({ order: { orders: "EUR", loading: "https://api.telegram.org/" }, auth: { token: "operator", userId: "b'nXQpVsglEGFJgfK'" } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            mapStateToProps({ order: { orders: "GBP", loading: "https://" }, auth: { token: "lambda", userId: 7588892 } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            mapStateToProps({ order: { orders: "USDT", loading: "http://example.com/showcalendar.html?token=CKF50YzIHxCTKMAg" }, auth: { token: "var", userId: "b'nXQpVsglEGFJgfK'" } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            mapStateToProps({ order: { orders: "BTC", loading: "https://accounts.google.com/o/oauth2/revoke?token=%s" }, auth: { token: "integer", userId: "/people/%s/@self" } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            mapStateToProps({ order: { orders: "USDT", loading: "https://accounts.google.com/o/oauth2/revoke?token=%s" }, auth: { token: "operator", userId: "b'nXQpVsglEGFJgfK'" } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            mapStateToProps(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
