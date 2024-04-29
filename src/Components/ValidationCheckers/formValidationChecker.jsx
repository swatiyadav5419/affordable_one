export default function formValidationChecker(event) {
    var { name, value } = event.target
    switch (name) {
        case "name":
        case "color":
            if (value.length === 0)
                return name + " field must required"
            else if (value.length < 3 || value.length > 50)
                return name + " field must contains atleast 3 character and must be less then 50 characters"
            else
                return ""
        case "size":
            if (value.length === 0)
                return name + " field must required"
            else if (value.length > 10)
                return name + " field must contains less then 10 characters"
            else
                return ""
        case "baseprice":
            if (!value)
                return name + " field must required"
            else if (value < 1)
                return "Bese Price Must Greater then 0"
            else
                return ""
        case "discount":
            if (!value)
                return name + " field must required"
            else if (value < 0 && value > 100)
                return "Discount Must be Greater then 0 && Less Then 100"
            else
                return ""
        default:
            return ""
    }
}