let sessionKey = document.head.innerText.substr(
	document.head.innerText.search(`"sesskey":"`) + 11,
	10
);
document.body.innerHTML = `<form method="post">
   <div>
     <input type="submit" value="Yes" />
     <input type="hidden" name="agree" value="1" />
     <input type="hidden" name="sesskey" value="${sessionKey}" />
   </div>
 </form>`;
