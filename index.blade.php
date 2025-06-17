<p>
    <form action="{{ route('test-case.get') }}">
        <button type="submit">Получить данные</button>
        <span>{{ session('value') }}</span>
    </form>
</p>
<p>
    <form action="{{ route('test-case.check') }}">
        <input type="hidden" name="value" value="{{ session('value') }}">
        <button type="submit">Проверить данные данные</button>
        <span>{{ session('message') }}</span>
    </form>
</p>
