<script lang=ts>
     async function handleLogin() {
        const res = await fetch("/api/sign-in", {
            method: 'POST',
            body: JSON.stringify({
                username: 'mason@gollala.com',
                password: '123123a@'
            })
        });
        const data = await res.json();
        console.log(data);
     }
</script>

<h1>회원 로그인</h1>
<button on:click={handleLogin}>
    로그인
</button>

<style>

</style>