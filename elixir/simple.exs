IO.puts "Hello world from Elixir"
IO.puts String.length "hello"
add = fn a, b -> a + b end
IO.puts add.(1, 2)
IO.puts is_function(add)

IO.puts(case {1, 2, 3} do
  {4, 5, 6} -> "This clause won't match"
  {1, x, 3} -> "This clause will match and bind x to #{x}"
  _ -> "This clause would match any value"
end)

defmodule Math do
  def sum(a, b), do: do_sum(a, b)

  defp do_sum(a, b), do: a + b

  def zero?(0), do: true

  def zero?(x) when is_integer(x), do: false
end

IO.puts(Math.sum(1, 2))
fun = &Math.zero?/1

defmodule Fibonacci do
  defp fib_inner(n, prev, cur) do 
    case n do
      0 -> prev
      _ -> fib_inner(n-1, cur, prev+cur)
    end
  end

  def fib(n) do
    fib_inner(n, 0, 1)
  end

end

defmodule ProcessTest do
  def start() do
    parent = self()
    spawn fn -> send(parent, { :hello, self() }) end
    spawn fn -> send(parent, { :fib, Fibonacci.fib(1000) }) end
    spawn fn -> send(parent, { :end }) end
    loop()
  end

  defp loop() do
    receive do
      {:hello, pid} -> 
        IO.puts("Got hello from #{inspect pid}")
        loop()
      {:fib, result} ->
        IO.puts("Fibonacci number #{inspect result}")
        loop()
      { :end } ->
        IO.puts("Ending receive loop")
    end
  end

end

ProcessTest.start()
