function showuserinfo(ctx,next) {
    console.log(`${ctx.from.first_name} ${ctx.from.last_name} ${ctx.from.language_code} ${ctx.from.id}  message: (${ctx.message.text})`)
    return (next())
}
  

module.exports={showuserinfo}