<script>
export default {
	name: 'NavLink',
	props: ['url', 'text']
}
</script>

<template>
	<a :href="url">{{ text }}</a>
</template>

<style scoped lang="scss">
a {
    margin: 1rem;
}
</style>